import { z } from "zod";
import { BasePaymentGateway } from "./base";
import { PaymentGatewayType } from "@repo/model/types/enums";

export const TropipaySchema = BasePaymentGateway.omit({
  type: true,
}).extend({
  type: z.literal(PaymentGatewayType.TROPIPAY),
  data: z.object({
    clientId: z.string().min(1, { message: "required" }),
    clientSecret: z.string().min(1, { message: "required" }),
  }),
});
