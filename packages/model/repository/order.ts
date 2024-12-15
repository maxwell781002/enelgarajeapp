"use server";

import { cookies } from "next/headers";
import prisma, { transaction } from "../prisma/prisma-client";
import { addProductFields, getById } from "./product";
import {
  CompleteBusiness,
  CompleteOrder,
  CompleteOrderProduct,
  CompleteProduct,
  CompleteUser,
} from "../prisma/zod";
import { getCurrentUser, updateUser } from "./user";
import { AddressType, TUserRegisterSchema } from "../validation/user";
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
import { IProduct } from "../types/product";

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
  const items: ShopCartItem[] = await Promise.all(
    order.items.map(async ({ price, quantity, product, ...item }) => {
      const _product = (await addProductFields(product, order)) as IProduct;
      return {
        ...item,
        price,
        product,
        quantity,
        total: price * quantity,
        commission: _product._commission * quantity,
        businessProfit: _product._businessProfit * quantity,
        outOfStock:
          !product.allowOrderOutOfStock &&
          product.isExhaustible &&
          product.stock < quantity,
      };
    }),
  );
  const { total, commission, businessProfit } = items.reduce(
    (acc, item: any) => {
      return {
        total: acc.total + item.total,
        commission: acc.commission + item.commission,
        businessProfit: acc.businessProfit + item.businessProfit,
      };
    },
    { total: 0, commission: 0, businessProfit: 0 },
  );
  order.total = total;
  order.commission = commission;
  order.businessProfit = businessProfit;
  order.hasProductOutOfStock = items.some(({ outOfStock }) => outOfStock);
  return { ...order, items, total };
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

export const setQuantity = async (productId: string, quantity: number) => {
  const order = await getOrCrateOrder();
  const find = order.items.some(
    (item: CompleteOrderProduct) => item.productId === productId,
  );
  if (!find || quantity < 1) {
    return;
  }
  return prisma().order.update({
    where: { id: order.id },
    data: {
      items: {
        update: {
          where: { productId_orderId: { productId, orderId: order.id } },
          data: { quantity },
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

export const checkoutOrder = async (
  user: TUserRegisterSchema,
  business: CompleteBusiness,
  isCollaborator: boolean = false,
) => {
  const newOrder = await transaction(async () => {
    let order = await getOrCrateOrder();
    if (order.hasProductOutOfStock) {
      throw new BadRequestError("out_of_stock");
    }
    const userEntity = (await getCurrentUser()) as CompleteUser;
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

    // TODO: Find a better way to do this
    const shoppingCart = await getCurrentOrder();
    order.commission = shoppingCart?.commission || 0;
    order.businessProfit = shoppingCart?.businessProfit || 0;

    const newOrder = await orderRepository.placeOrder(
      order,
      userEntity,
      business,
      isCollaborator,
    );
    const productToUpdate: UpdateStockItem[] = order.items.map(
      ({ product, quantity }) => [product, quantity],
    );
    await productRepository.updateStock(productToUpdate);
    if (business.requestAddress) {
      await orderAddressRepository.createNew(newOrder.id, address);
      if (addressType === AddressType.newAddress) {
        await addAddressToUser(
          userEntity.id,
          business.id,
          address,
          isCollaborator,
        );
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

export const getOrderCurrentUser = async (
  business: CompleteBusiness,
  isCollaborator: boolean = false,
) => {
  const userId = (await getCurrentUser())?.id;
  const businessId = business?.id;
  if (!userId || !businessId) {
    return null;
  }
  return orderRepository.getByBusinessAndUser(
    userId,
    businessId,
    isCollaborator,
  );
};
