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
  items: z.array(formSchema).superRefine((items, ctx) => {
    const types = new Set();
    for (const item of items) {
      if (types.has(item.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate payment gateway type: ${item.type}`,
          path: [],
        });
      }
      types.add(item.type);
    }
  }),
});
