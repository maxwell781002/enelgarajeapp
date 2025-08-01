import { z } from "zod";
import { TropipaySchema } from "./tropipay";
import { QvapaySchema } from "./qvapay";
import { ManualSchema } from "./manual";

const formSchema = z.discriminatedUnion("type", [
  TropipaySchema,
  QvapaySchema,
  ManualSchema,
]);

export const paymentGatewaysSchema = z.object({
  businessId: z.string(),
  items: z.array(formSchema),
});
