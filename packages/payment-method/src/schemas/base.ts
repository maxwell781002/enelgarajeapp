import { PaymentGatewayModel } from "@repo/model/prisma/zod/paymentgateway";
import z from "zod";

export const BasePaymentGateway = PaymentGatewayModel.omit({
  businessId: true,
}).extend({
  id: z.string().optional(),
});
