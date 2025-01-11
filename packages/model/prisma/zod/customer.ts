import * as z from "zod";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteCollaboratorTicket,
  RelatedCollaboratorTicketModel,
} from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const CustomerModel = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Required" }),
  phones: jsonSchema,
  identification: z.string().min(1, { message: "Required" }),
  businessId: z.string(),
});

export interface CompleteCustomer extends z.infer<typeof CustomerModel> {
  business: CompleteBusiness;
  tickets: CompleteCollaboratorTicket[];
}

/**
 * RelatedCustomerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCustomerModel: z.ZodSchema<CompleteCustomer> = z.lazy(() =>
  CustomerModel.extend({
    business: RelatedBusinessModel,
    tickets: RelatedCollaboratorTicketModel.array(),
  }),
);
