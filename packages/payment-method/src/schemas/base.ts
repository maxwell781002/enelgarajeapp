import { PaymentGatewayModel } from "@repo/model/prisma/zod/paymentgateway";

export const BasePaymentGateway = PaymentGatewayModel.omit({
  id: true,
  businessId: true,
});
