import { z } from "zod";
import { BusinessModel, TelegramBusinessModel } from "../prisma/zod";

export const BusinessValidation = BusinessModel.omit({
  id: true,
  coordinates: true,
}).extend({
  userId: z.string().optional(),
  telegram: TelegramBusinessModel.omit({
    businessId: true,
    id: true,
  }).optional(),
});
