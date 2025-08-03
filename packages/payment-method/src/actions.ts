import { z } from "zod";
import { app, appWeb } from "@repo/model/lib/action/app";
import { paymentGatewayRepository } from "@repo/model/repositories/payment-gateway";
import { paymentGatewaysSchema } from "./schemas";

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

export const savePaymentGateways = app(
  { input: paymentGatewaysSchema },
  async (ctx) => {
    const { businessId, items } = ctx.input;
    const promises = items.map(({ id, ...rest }: any) => {
      if (id) {
        return paymentGatewayRepository.update(id, rest);
      }
      return paymentGatewayRepository.create({ businessId, data: {}, ...rest });
    });
    await Promise.all(promises);
  },
);

export const getPaymentGatewaysActive = appWeb(async (ctx) => {
  const { business } = ctx;
  return paymentGatewayRepository.findByBusinessIdActive(business.id as string);
});
