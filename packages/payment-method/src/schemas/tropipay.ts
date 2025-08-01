import { z } from "zod";
import { BasePaymentGateway } from "./base";

export const TropipaySchema = BasePaymentGateway.extend({
  data: z.object({
    clientId: z.string().min(1, { message: "required" }),
    clientSecret: z.string().min(1, { message: "required" }),
  }),
});
