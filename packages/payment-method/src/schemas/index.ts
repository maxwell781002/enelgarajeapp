import { z } from "zod";
import { TropipaySchema } from "./tropipay";

const formSchema = z.discriminatedUnion("type", [TropipaySchema]);

export const paymentGatewaysSchema = z.object({
  forms: z.array(formSchema),
});
