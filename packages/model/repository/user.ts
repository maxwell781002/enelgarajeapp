"use server";

import prisma from "../prisma/prisma-client";
import { UserRegisterSchema } from "../validation/user";
import { auth } from "../lib/auth";
import { userRepository } from "../repositories/user";
import { addressRepository } from "../repositories/address";
import { userAddressRepository } from "../repositories/user-address";

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const getUserAndBusinessById = async (id: string) => {
  return userRepository.getUserWithBusinesses(id);
};

export const updateUser = async (id: string, data: any) => {
  UserRegisterSchema.parse(data);
  return prisma().user.update({
    where: { id },
    data,
  });
};

export const addAddressToUser = async (userId: string, data: any) => {
  const address = await addressRepository.create(data);
  return userAddressRepository.create({ addressId: address.id, userId });
};

export const removeAddressFromUser = async (
  userId: string,
  addressId: string,
) => {
  console.log(userId, addressId);
  const userAddress = await userAddressRepository.findByAddressIdAndUserId(
    addressId,
    userId,
  );
  if (!userAddress) {
    throw new Error("Address not found");
  }
  await userAddressRepository.remove(userAddress.id);
  await addressRepository.remove(userAddress.addressId);
};

export const updateUserAddress = async (
  userId: string,
  addressId: string,
  data: any,
) => {
  const userAddress = await userAddressRepository.findByAddressIdAndUserId(
    addressId,
    userId,
  );
  if (!userAddress) {
    throw new Error("Address not found");
  }
  return addressRepository.update(addressId, data);
};
