import { PaymentGatewayType } from "@repo/model/types/enums";
import { BasePaymentGateway } from "./base";
import { z } from "zod";

export const ManualSchema = BasePaymentGateway.omit({
  type: true,
  data: true,
}).extend({
  type: z.literal(PaymentGatewayType.MANUAL),
});
