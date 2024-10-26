import { AddressModel, UserModel } from "../prisma/zod";
import { z } from "zod";

export const UserRegisterSchema = UserModel.omit({
  id: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  address: AddressModel.omit({ id: true }),
});

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>;
