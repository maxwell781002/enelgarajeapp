import { AddressModel, UserModel } from "../prisma/zod";
import { z } from "zod";

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
  addressType: z.string().min(1, { message: "Required" }),
});

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>;

export const addressValidation: any = {
  [AddressType.selectAddress]: {
    addressSelected: AddressModel.required(),
  },
  [AddressType.newAddress]: {
    address: AddressModel.omit({ id: true }).required(),
  },
};
