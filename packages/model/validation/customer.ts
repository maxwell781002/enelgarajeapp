import { CustomerModel } from "../prisma/zod";
import { z } from "zod";
import { phoneSchema } from "@repo/model/validation/general";

export const CustomerForm = CustomerModel.omit({
  id: true,
  phones: true,
  businessId: true,
}).extend({
  phone: phoneSchema,
});

export type TCustomerForm = z.infer<typeof CustomerForm>;
