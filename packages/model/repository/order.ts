"use server";

import { cookies } from "next/headers";
import prisma from "../prisma/prisma-client";
import { getById } from "./product";
import {
  CompleteOrder,
  CompleteOrderProduct,
  CompleteProduct,
  CompleteUser,
} from "../prisma/zod";
import { getCurrentUser, getOrCreateUser, updateUser } from "./user";
import { OrderStatus } from "@prisma/client";
import { TUserRegisterSchema } from "../validation/user";

export type ShopCartOrder = {
  numberOfItems: number | undefined;
  items: ShopCartItem[];
} & CompleteOrder;

export type ProductShopCartItem = {
  _inCart: boolean;
} & CompleteProduct;

export type ShopCartItem = {
  total: number;
} & CompleteOrderProduct;

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
    ({ price, quantity, ...item }) => ({
      ...item,
      price,
      quantity,
      total: price * quantity,
    }),
  );
  order.total = items.reduce((acc, item: any) => acc + item.total, 0);
  return { ...order, items };
};

export const hasProduct = async (
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
    const { id } = (await getOrCreateUser()) as CompleteUser;
    order = (await prisma.order.create({
      data: { productsDetails: "[]", userId: id },
    })) as ShopCartOrder;
    cookies().set("order_id", order.id);
  }
  return order;
};

const getProducts = (order: ShopCartOrder) => {
  return order.productsDetails instanceof Array
    ? order.productsDetails
    : JSON.parse((order.productsDetails as string) || "[]");
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
  return prisma.order.update({
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
  let products = await getProducts(order);
  products = products.filter((product: any) => product.id !== productId);
  return prisma.order.update({
    where: { id: order.id },
    data: {
      productsDetails: JSON.stringify(products),
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
  let products = await getProducts(order);
  const find = (order.items || []).find(
    (item: any) => item.productId === product.id,
  );
  const position =
    (
      await prisma.orderProduct.findFirst({
        where: { orderId: order.id },
        orderBy: { position: "desc" },
      })
    )?.position || 0;
  if (!find) {
    products = [...products, product];
  }
  return prisma.order.update({
    where: { id: order.id },
    data: {
      productsDetails: JSON.stringify(products),
      items: {
        upsert: {
          create: {
            productId,
            quantity: 1,
            price: product.price,
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

const generateIdentifier = (date: Date, position: number) => {
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${position}`;
};

export const checkoutOrder = async (user: TUserRegisterSchema) => {
  const userEntity = (await getCurrentUser()) as CompleteUser;
  await updateUser(userEntity.id, user);
  const order = await getOrCrateOrder();
  const position =
    (
      await prisma.order.findFirst({
        orderBy: { position: "desc" },
      })
    )?.position || 0;
  const newPosition = position + 1;
  await prisma.order.update({
    where: { id: order.id },
    data: {
      total: order.total,
      status: OrderStatus.SEND,
      position: newPosition,
      sentAt: new Date(),
      identifier: generateIdentifier(new Date(), newPosition),
    },
  });
  cookies().delete("order_id");
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
        orderBy: { position: "asc" },
      },
    },
  });
};

export const getOrdersByUserId = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId, NOT: { status: OrderStatus.CREATED } },
    include: {
      items: {
        include: { product: true },
        orderBy: { position: "asc" },
      },
    },
  });
};

export const getOrderCurrentUser = async () => {
  const userId = (await getCurrentUser())?.id;
  if (!userId) {
    return null;
  }
  return getOrdersByUserId(userId);
};
