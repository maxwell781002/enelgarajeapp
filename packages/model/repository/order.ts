"use server";

import { CompleteBusiness } from "@repo/model/prisma/zod/business";
import { getCurrentUser } from "@repo/model/repository/user";
import { orderRepository } from "@repo/model/repositories/order";
// import { checkBusinessAccess } from "./business";
import { SecurityUser } from "../lib/auth";
import { CompleteOrder } from "../prisma/zod";
import { OrderStatus, UserBusinessType } from "@repo/model/types/enums";
import { userRepository } from "../repositories/user";

// TODO: No me funciono la seguridad de esto. Tengo que arreglarlo rapido
export const getOrderSecurity = async (
  id: string,
  user: SecurityUser | null = null,
) => {
  const order = await orderRepository.getOrderById(id);
  if (!order) {
    return null;
  }
  user = user || (await getCurrentUser());
  if (!user) {
    return null;
  }
  // if (
  //   !(await checkBusinessAccess(order.businessId ?? "", user)) ||
  //   order.user?.id == user?.id
  // ) {
  //   return null;
  // }
  return order;
};

// TODO: Remove this method
export const getOrderById = async (id: string) => {
  return orderRepository.getOrderById(id);
};

export const getOrderByIdAndBusinessId = async (
  id: string,
  businessId: string,
) => {
  return orderRepository.getOrderByIdAndBusinessId(id, businessId);
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
    businessId as string,
    isCollaborator,
  );
};

export const canBeUpdated = async (order: CompleteOrder) => {
  return order.status === OrderStatus.SEND;
};

export const setMessengerToOrder = async (
  businessId: string,
  orderId: string,
  userId: string,
) => {
  const order = await getOrderByIdAndBusinessId(orderId, businessId);
  const user = await userRepository.getByUserAndBusinessIdAndType(
    userId,
    businessId,
    UserBusinessType.MESSENGER,
  );
  if (!user || !order) {
    throw new Error("User or order not found");
  }
  if (order.status === OrderStatus.PAYED) {
    throw new Error("Order already payed");
  }
  return orderRepository.setMessengerToOrder(orderId, user.id);
};

export const getOrdersByMessenger = async (messengerId: string) => {
  return orderRepository.getOrdersByMessenger(messengerId);
};
