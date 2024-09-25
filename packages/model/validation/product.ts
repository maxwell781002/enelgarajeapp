import { boolean, z } from "zod";
import { ProductModel } from "../prisma/zod/product";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const baseValidation = ProductModel.omit({
  id: true,
  businessId: true,
  images: true,
});

type ValidationRule = [(data: any) => boolean, string];
const validatePrice: ValidationRule = [
  (data: any) => !data.offerPrice || data.price > data.offerPrice,
  "price_should_be_less_than_offer_price",
];

export const ProductValidation = baseValidation
  .extend({
    image: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  })
  .refine(...validatePrice);

export const ProductUpdateValidation = baseValidation
  .extend({
    image: z
      .any()
      .refine(
        (file) => !file?.size || file?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`,
      )
      .refine(
        (file) => !file?.type || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  })
  .refine(...validatePrice);
