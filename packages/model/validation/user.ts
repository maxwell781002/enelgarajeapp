import { AddressModel, UserModel } from "../prisma/zod";
import { z } from "zod";
import { CompleteAddress } from "../prisma/zod/address";

export enum AddressType {
  newAddress = "newAddress",
  selectAddress = "selectAddress",
}

export const UserRegisterSchema = UserModel.omit({
  id: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  addressType: z.string().optional(),
  wantDomicile: z.boolean().optional(),
});

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema> & {
  [AddressType.newAddress]: CompleteAddress;
  [AddressType.selectAddress]: CompleteAddress;
};

export const addressValidation: any = {
  [AddressType.selectAddress]: AddressModel.required(),
  [AddressType.newAddress]: AddressModel.omit({ id: true }).required(),
};
