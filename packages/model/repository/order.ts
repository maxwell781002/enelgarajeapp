"use server";

import { cookies } from "next/headers";
import prisma from "../prisma/prisma-client";
import { getById } from "./plate";
import {
  CompleteOrder,
  CompleteOrderProduct,
  CompletePlate,
} from "../prisma/zod";

export type ShopCartOrder = {
  numberOfItems: number | undefined;
} & CompleteOrder;

export const getCurrentOrder = async (): Promise<
  ShopCartOrder | null | undefined
> => {
  const cookieStore = cookies();
  const orderId = cookieStore.get("order_id");
  if (orderId) {
    const order = (await prisma.order.findUnique({
      where: { id: orderId.value },
      include: {
        items: {
          include: { product: true },
          orderBy: { position: "asc" },
        },
      },
    })) as ShopCartOrder;
    if (order) {
      order.numberOfItems = order.items.reduce((acc, { quantity }) => acc + quantity, 0);
    }
    if (order?.items) {
      order.items = order.items.map(({ price, quantity, ...item }) => ({
        ...item,
        price,
        quantity,
        total: price * quantity,
      }));
      order.total = order.items.reduce((acc, item: any) => acc + item.total, 0);
    }
    return order;
  }
};

export const hasProduct = async (productId: string) => {
  const order = await getCurrentOrder();
  if (!order) {
    return false;
  }
  return order.items.some((product: any) => product.productId === productId);
};

export const getOrCrateOrder = async () => {
  let order = await getCurrentOrder();
  if (!order) {
    order = (await prisma.order.create({
      data: { productsDetails: "[]" },
    })) as ShopCartOrder;
    cookies().set("order_id", order.id);
  }
  return order;
};

export const getProducts = (order: ShopCartOrder) => {
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
  });
};

export const addToOrder = async (productId: string) => {
  const product = (await getById(productId)) as CompletePlate;
  const order = await getOrCrateOrder();
  let products = await getProducts(order);
  const find = (order.items || []).find((item: any) => item.id === product.id);
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
  });
};
