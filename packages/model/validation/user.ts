import { AddressModel } from "../prisma/zod";
import { z } from "zod";
import { CompleteAddress } from "../prisma/zod/address";

export enum AddressType {
  newAddress = "newAddress",
  selectAddress = "selectAddress",
}

const UserValidation = {
  phone: z.string().min(2, {
    message: "required",
  }),
  name: z.string().min(2, {
    message: "required",
  }),
};

export const UserRegisterSchema = z.object(UserValidation);

export const UserCollaborationRegisterSchema = UserRegisterSchema;

const CartItem = z.object({
  productId: z.string(),
  quantity: z.number().int(),
});
export type TCartItem = z.infer<typeof CartItem>;

const BaseCart = z.object({
  cartItems: z.array(CartItem).min(1, {
    message: "required",
  }),
});

export const WebShoppingCartSchema = BaseCart.extend({
  addressType: z.string(),
  businessRequestAddress: z.boolean().optional(),
  wantDomicile: z.boolean().optional(),
  [AddressType.newAddress]: AddressModel.omit({ id: true }).optional(),
  [AddressType.selectAddress]: AddressModel.optional(),
}).refine(
  (val) =>
    !val.businessRequestAddress ||
    (val.businessRequestAddress &&
      ((val.addressType === AddressType.newAddress &&
        val[AddressType.newAddress]) ||
        (val.addressType === AddressType.selectAddress &&
          val[AddressType.selectAddress]))),
  (val) => ({
    message: "Required",
    path: [val.addressType as AddressType],
  }),
);
export type TWebShoppingCartSchema = z.infer<typeof WebShoppingCartSchema>;

export const CollaboratorShoppingCartSchema = BaseCart.extend({
  wantDomicile: z.boolean().optional(),
  address: AddressModel.omit({ id: true }).optional(),
}).refine((val) => !val.wantDomicile || (val.wantDomicile && val.address), {
  message: "required",
  path: ["address"],
});
export type TCollaboratorShoppingCartSchema = z.infer<
  typeof CollaboratorShoppingCartSchema
>;

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema> & {
  [AddressType.newAddress]: CompleteAddress;
  [AddressType.selectAddress]: CompleteAddress;
};

export const addressValidation: any = {
  [AddressType.selectAddress]: AddressModel.required(),
  [AddressType.newAddress]: AddressModel.omit({ id: true }).required(),
};
