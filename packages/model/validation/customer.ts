import { CustomerModel } from "../prisma/zod";
import { z } from "zod";

export const CustomerForm = CustomerModel.omit({
  id: true,
  phones: true,
}).extend({
  phone: z.string().min(2, {
    message: "required",
  }),
});

export type TCustomerForm = z.infer<typeof CustomerForm>;
