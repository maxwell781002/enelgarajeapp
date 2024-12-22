import { AddressModel } from "../prisma/zod";
import { z } from "zod";
import { CompleteAddress } from "../prisma/zod/address";

export enum AddressType {
  newAddress = "newAddress",
  selectAddress = "selectAddress",
}

export const UserRegisterSchema = z.object({
  phone: z.string().min(2, {
    message: "required",
  }),
  name: z.string().min(2, {
    message: "required",
  }),
});

export const UserCollaborationRegisterSchema = UserRegisterSchema;

export const WebShoppingCartSchema = UserRegisterSchema.extend({
  addressType: z.string(),
  businessRequestAddress: z.boolean().optional(),
  wantDomicile: z.boolean().optional(),
  [AddressType.newAddress]: AddressModel.omit({ id: true }).optional(),
  [AddressType.selectAddress]: AddressModel.optional(),
}).refine(
  (val) =>
    !val.businessRequestAddress || val.businessRequestAddress && (
      (val.addressType === AddressType.newAddress &&
        val[AddressType.newAddress]) ||
      (val.addressType === AddressType.selectAddress &&
        val[AddressType.selectAddress])
    ),
  (val) => ({
    message: "required",
    path: [val.addressType as AddressType],
  }),
);

export const CollaboratorShoppingCartSchema = z.object({
  wantDomicile: z.boolean().optional(),
  address: AddressModel.omit({ id: true }).optional(),
}).refine(
  (val) => !val.wantDomicile || val.wantDomicile && val.address,
  {
    message: "required",
    path: ["address"],
  },
);

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema> & {
  [AddressType.newAddress]: CompleteAddress;
  [AddressType.selectAddress]: CompleteAddress;
};

export const addressValidation: any = {
  [AddressType.selectAddress]: AddressModel.required(),
  [AddressType.newAddress]: AddressModel.omit({ id: true }).required(),
};
