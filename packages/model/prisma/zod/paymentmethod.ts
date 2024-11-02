import * as z from "zod";
import { PaymentMethodType } from "../generated/client";
import { CompleteBusiness, RelatedBusinessModel } from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const PaymentMethodModel = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "required" }),
  type: z.nativeEnum(PaymentMethodType),
  data: jsonSchema,
  businessId: z.string(),
});

export interface CompletePaymentMethod
  extends z.infer<typeof PaymentMethodModel> {
  business: CompleteBusiness;
  defaultBusiness?: CompleteBusiness | null;
}

/**
 * RelatedPaymentMethodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPaymentMethodModel: z.ZodSchema<CompletePaymentMethod> =
  z.lazy(() =>
    PaymentMethodModel.extend({
      business: RelatedBusinessModel,
      defaultBusiness: RelatedBusinessModel.nullish(),
    }),
  );
