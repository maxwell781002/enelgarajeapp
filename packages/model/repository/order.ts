"use server";

import { cookies } from "next/headers";
import prisma, { transaction } from "../prisma/prisma-client";
import { getById } from "./product";
import {
  CompleteBusiness,
  CompleteOrder,
  CompleteOrderProduct,
  CompleteProduct,
  CompleteUser,
} from "../prisma/zod";
import { getCurrentUser, updateUser } from "./user";
import { AddressType, TUserRegisterSchema } from "../validation/user";
import { getCurrentBusiness } from "./business";
import { orderRepository } from "../repositories/order";
// import eventEmitter from "../lib/event-emitter";
import { OrderSend } from "../lib/event-emitter/events";
import { sendOrderToTelegram } from "../listeners/new-order";
import { orderAddressRepository } from "../repositories/order-address";
import { productRepository, UpdateStockItem } from "../repositories/product";
import { ShopCartItem, ShopCartOrder } from "../types/shop-cart";
import { BadRequestError } from "../errors/bad-request";
import { getBusinessShippingPrice } from "./business-neighborhood";
import { calculateShippingPrice } from "../lib/order";
import { addAddressToUser } from "./address";

export const getCurrentOrder = async (): Promise<
  ShopCartOrder | null | undefined
> => {
  const cookieStore = cookies();
  const orderId = cookieStore.get("order_id");
  if (!orderId) {
    return null;
  }
  const order = (await getOrderById(orderId.value)) as ShopCartOrder;
  if (!order) {
    return null;
  }
  order.numberOfItems = order.items.reduce(
    (acc, { quantity }) => acc + quantity,
    0,
  );
  const items: ShopCartItem[] = order.items.map(
    ({ price, quantity, product, ...item }) => ({
      ...item,
      price,
      product,
      quantity,
      total: price * quantity,
      outOfStock:
        !product.allowOrderOutOfStock &&
        product.isExhaustible &&
        product.stock < quantity,
    }),
  );
  order.total = items.reduce((acc, item: any) => acc + item.total, 0);
  order.hasProductOutOfStock = items.some(({ outOfStock }) => outOfStock);
  return { ...order, items };
};

export const hasProduct = (
  productId: string,
  order: ShopCartOrder | null | undefined,
) => {
  if (!order) {
    return false;
  }
  return order.items.some((product: any) => product.productId === productId);
};

export const getOrCrateOrder = async () => {
  let order = await getCurrentOrder();
  if (!order) {
    order = (await prisma().order.create({
      data: { productsDetails: [] },
    })) as ShopCartOrder;
    cookies().set("order_id", order.id);
  }
  return order;
};

export const decrementItem = async (productId: string) => {
  const order = await getOrCrateOrder();
  const find = order.items.some(
    (item: CompleteOrderProduct) =>
      item.productId === productId && item.quantity > 1,
  );
  if (!find) {
    return;
  }
  return incrementDecrementItem(order, productId, "decrement");
};

export const incrementItem = async (productId: string) => {
  const order = await getOrCrateOrder();
  return incrementDecrementItem(order, productId, "increment");
};

const incrementDecrementItem = async (
  order: CompleteOrder,
  productId: string,
  action: "increment" | "decrement",
) => {
  const find = order.items.some(
    (item: CompleteOrderProduct) => item.productId === productId,
  );
  if (!find) {
    return;
  }
  return prisma().order.update({
    where: { id: order.id },
    data: {
      items: {
        update: {
          where: { productId_orderId: { productId, orderId: order.id } },
          data: { quantity: { [action]: 1 } },
        },
      },
    },
    include: { items: { orderBy: { position: "asc" } } },
  });
};

export const removeFromOrder = async (productId: string) => {
  const order = await getOrCrateOrder();
  let products = order.productsDetails as Array<any>;
  products = products.filter((product: any) => product.id !== productId);
  return prisma().order.update({
    where: { id: order.id },
    data: {
      productsDetails: products,
      items: {
        delete: {
          productId_orderId: {
            productId,
            orderId: order.id,
          },
        },
      },
    },
    include: { items: { orderBy: { position: "asc" } } },
  });
};

export const addToOrder = async (productId: string) => {
  const product = (await getById(productId)) as CompleteProduct;
  const order = await getOrCrateOrder();
  let products = order.productsDetails as Array<any>;
  const find = (order.items || []).find(
    (item: any) => item.productId === product.id,
  );
  const position =
    (
      await prisma().orderProduct.findFirst({
        where: { orderId: order.id },
        orderBy: { position: "desc" },
      })
    )?.position || 0;
  if (!find) {
    products = [...products, product];
  }
  return prisma().order.update({
    where: { id: order.id },
    data: {
      productsDetails: products,
      items: {
        upsert: {
          create: {
            productId,
            quantity: 1,
            price: product.offerPrice || product.price,
            position: position + 1,
          },
          update: { quantity: { increment: 1 } },
          where: {
            productId_orderId: {
              productId,
              orderId: order.id,
            },
          },
        },
      },
    },
    include: { items: { orderBy: { position: "asc" } } },
  });
};

const getShippingPrice = async (
  order: ShopCartOrder,
  neighborhoodId: string | null = null,
  wantDomicile: boolean = false,
  businessId?: string,
) => {
  if (neighborhoodId) {
    const neighborhoodShippingPrice = await getBusinessShippingPrice(
      businessId as string,
      neighborhoodId,
    );
    const { shippingPrice, total } = calculateShippingPrice(
      order,
      neighborhoodShippingPrice,
      wantDomicile,
    );
    order.total = total;
    order.shipping = shippingPrice;
  }
  return order;
};

export const checkoutOrder = async (user: TUserRegisterSchema) => {
  const newOrder = await transaction(async () => {
    let order = await getOrCrateOrder();
    if (order.hasProductOutOfStock) {
      throw new BadRequestError("out_of_stock");
    }
    const userEntity = (await getCurrentUser()) as CompleteUser;
    const business = (await getCurrentBusiness()) as CompleteBusiness;
    const {
      addressType,
      newAddress,
      selectAddress,
      wantDomicile,
      ...userData
    } = user;
    await updateUser(userEntity.id, userData);
    const { id, ...address } =
      (AddressType.newAddress === addressType ? newAddress : selectAddress) ||
      {};
    order = await getShippingPrice(
      order,
      address.neighborhoodId,
      wantDomicile,
      business.id,
    );
    const newOrder = await orderRepository.placeOrder(
      order,
      userEntity,
      business,
    );
    const productToUpdate: UpdateStockItem[] = order.items.map(
      ({ product, quantity }) => [product, quantity],
    );
    await productRepository.updateStock(productToUpdate);
    if (business.requestAddress) {
      await orderAddressRepository.createNew(newOrder.id, address);
      if (addressType === AddressType.newAddress) {
        await addAddressToUser(userEntity.id, business.id, address);
      }
    }
    return newOrder;
  });
  cookies().delete("order_id");
  //TODO: When I configure the listener send the event instance of
  // eventEmitter.dispatch(new OrderSend(newOrder as CompleteOrder));
  await sendOrderToTelegram(new OrderSend(newOrder as CompleteOrder));
  return newOrder;
};

export const getOrderById = async (id: string) => {
  return orderRepository.getOrderById(id);
};

export const getOrderCurrentUser = async () => {
  const userId = (await getCurrentUser())?.id;
  const businessId = (await getCurrentBusiness())?.id;
  if (!userId || !businessId) {
    return null;
  }
  return orderRepository.getByBusinessAndUser(userId, businessId);
};
