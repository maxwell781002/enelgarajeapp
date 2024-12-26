"use server";

import { CompleteBusiness } from "@repo/model/prisma/zod/business";
import { getCurrentUser } from "@repo/model/repository/user";
import { orderRepository } from "@repo/model/repositories/order";

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
    businessId as string,
    isCollaborator,
  );
};
