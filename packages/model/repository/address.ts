import { addressRepository } from "../repositories/address";
import { userAddressRepository } from "../repositories/user-address";

export const addAddressToUser = async (
  userId: string,
  businessId: string,
  data: any,
) => {
  const address = await addressRepository.create(data);
  return userAddressRepository.create({
    addressId: address.id,
    userId,
    businessId,
  });
};

export const removeAddressFromUser = async (
  userId: string,
  addressId: string,
) => {
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
