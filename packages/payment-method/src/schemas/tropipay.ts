import { z } from "zod";
import { BasePaymentGateway } from "./base";

export const TropipaySchema = BasePaymentGateway.extend({
  data: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
  }),
});
