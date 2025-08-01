import { z } from "zod";
import app from "../lib/action/app";
import { paymentGatewayRepository } from "../repositories/payment-gateway";

export const getPaymentGateways = app(
  {
    input: z.object({
      businessId: z.string(),
    }),
  },
  ({ input: { businessId } }) => {
    return paymentGatewayRepository.findByBusinessId(businessId);
  },
);

export const savePaymentGateways = app(async (ctx) => {
  console.log(JSON.stringify(ctx, null, 2));
});
