import * as z from "zod";
import {
  CompleteAddress,
  RelatedAddressModel,
  CompleteBusinessNeighborhood,
  RelatedBusinessNeighborhoodModel,
} from "./index";

export const NeighborhoodModel = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
});

export interface CompleteNeighborhood
  extends z.infer<typeof NeighborhoodModel> {
  addresses: CompleteAddress[];
  businessNeighborhood: CompleteBusinessNeighborhood[];
}

/**
 * RelatedNeighborhoodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNeighborhoodModel: z.ZodSchema<CompleteNeighborhood> =
  z.lazy(() =>
    NeighborhoodModel.extend({
      addresses: RelatedAddressModel.array(),
      businessNeighborhood: RelatedBusinessNeighborhoodModel.array(),
    }),
  );
