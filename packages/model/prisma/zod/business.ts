import * as z from "zod";
import { BusinessPlan } from "../generated/client";
import {
  CompletePaymentMethod,
  RelatedPaymentMethodModel,
  CompleteTelegramBusiness,
  RelatedTelegramBusinessModel,
  CompleteCategory,
  RelatedCategoryModel,
  CompleteProduct,
  RelatedProductModel,
  CompleteOrder,
  RelatedOrderModel,
  CompleteUserBusiness,
  RelatedUserBusinessModel,
  CompleteBusinessNeighborhood,
  RelatedBusinessNeighborhoodModel,
  CompleteUserAddress,
  RelatedUserAddressModel,
  CompleteInvitationLink,
  RelatedInvitationLinkModel,
} from "./index";

export const BusinessModel = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "required" }),
  description: z.string().min(1, { message: "required" }).nullish(),
  address: z.string().min(1, { message: "required" }).nullish(),
  phone: z.string().min(1, { message: "required" }).nullish(),
  howToArrive: z.string().nullish(),
  coordinates: z.number().array(),
  slug: z.string().min(1, { message: "required" }).nullish(),
  active: z.boolean().optional(),
  requestAddress: z.boolean().optional(),
  plan: z.nativeEnum(BusinessPlan),
  sendOrderToWhatsapp: z.boolean(),
  defaultPaymentMethodId: z.string().nullish(),
});

export interface CompleteBusiness extends z.infer<typeof BusinessModel> {
  defaultPaymentMethod?: CompletePaymentMethod | null;
  telegram?: CompleteTelegramBusiness | null;
  categories: CompleteCategory[];
  products: CompleteProduct[];
  orders: CompleteOrder[];
  users: CompleteUserBusiness[];
  businessNeighborhood: CompleteBusinessNeighborhood[];
  userAddress: CompleteUserAddress[];
  paymentMethod: CompletePaymentMethod[];
  invitationLinks: CompleteInvitationLink[];
}

/**
 * RelatedBusinessModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBusinessModel: z.ZodSchema<CompleteBusiness> = z.lazy(() =>
  BusinessModel.extend({
    defaultPaymentMethod: RelatedPaymentMethodModel.nullish(),
    telegram: RelatedTelegramBusinessModel.nullish(),
    categories: RelatedCategoryModel.array(),
    products: RelatedProductModel.array(),
    orders: RelatedOrderModel.array(),
    users: RelatedUserBusinessModel.array(),
    businessNeighborhood: RelatedBusinessNeighborhoodModel.array(),
    userAddress: RelatedUserAddressModel.array(),
    paymentMethod: RelatedPaymentMethodModel.array(),
    invitationLinks: RelatedInvitationLinkModel.array(),
  }),
);
