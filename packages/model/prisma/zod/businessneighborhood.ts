import * as z from "zod";
import {
  CompleteBusiness,
  RelatedBusinessModel,
  CompleteNeighborhood,
  RelatedNeighborhoodModel,
} from "./index";

export const BusinessNeighborhoodModel = z.object({
  id: z.string(),
  shipping: z.number().int(),
  active: z.boolean(),
  businessId: z.string(),
  neighborhoodId: z.string(),
});

export interface CompleteBusinessNeighborhood
  extends z.infer<typeof BusinessNeighborhoodModel> {
  business: CompleteBusiness;
  neighborhood: CompleteNeighborhood;
}

/**
 * RelatedBusinessNeighborhoodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBusinessNeighborhoodModel: z.ZodSchema<CompleteBusinessNeighborhood> =
  z.lazy(() =>
    BusinessNeighborhoodModel.extend({
      business: RelatedBusinessModel,
      neighborhood: RelatedNeighborhoodModel,
    }),
  );
