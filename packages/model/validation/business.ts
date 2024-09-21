import { z } from "zod";
import { BusinessModel } from "../prisma/zod";

export const BusinessValidation = BusinessModel.omit({
  id: true,
  coordinates: true,
}).extend({
  userId: z.string().optional(),
});
