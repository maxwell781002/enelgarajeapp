import { z } from "zod";
import { BusinessSiteModel } from "../prisma/zod";

const MAX_FILE_SIZE = 1000000;
const MAX_FILE_SIZE_MESSAGE = "Max image size is 1MB.";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const baseValidation = BusinessSiteModel.omit({
  id: true,
  businessId: true,
});

export const BusinessSiteValidation = baseValidation.extend({
  logo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, MAX_FILE_SIZE_MESSAGE)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export const BusinessSiteUpdateValidation = baseValidation.extend({
  logo: z
    .any()
    .refine(
      (file) => !file?.size || file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (file) => !file?.type || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export type BusinessSiteRegister = z.infer<typeof BusinessSiteValidation> &
  z.infer<typeof BusinessSiteUpdateValidation>;
