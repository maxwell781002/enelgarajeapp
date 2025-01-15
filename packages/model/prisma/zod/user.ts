import * as z from "zod";
import { UserRoles } from "../generated/client";
import {
  CompleteOrder,
  RelatedOrderModel,
  CompleteAccount,
  RelatedAccountModel,
  CompleteSession,
  RelatedSessionModel,
  CompleteAuthenticator,
  RelatedAuthenticatorModel,
  CompleteUserBusiness,
  RelatedUserBusinessModel,
  CompleteUserAddress,
  RelatedUserAddressModel,
  CompleteCollaboratorCardBank,
  RelatedCollaboratorCardBankModel,
  CompleteCollaboratorInvoice,
  RelatedCollaboratorInvoiceModel,
  CompleteCollaboratorProfile,
  RelatedCollaboratorProfileModel,
  CompleteCollaboratorTicket,
  RelatedCollaboratorTicketModel,
} from "./index";

export const UserModel = z.object({
  id: z.string(),
  role: z.nativeEnum(UserRoles),
  name: z.string().nullish(),
  phone: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  orders: CompleteOrder[];
  accounts: CompleteAccount[];
  sessions: CompleteSession[];
  Authenticator: CompleteAuthenticator[];
  business: CompleteUserBusiness[];
  address: CompleteUserAddress[];
  cardBanks: CompleteCollaboratorCardBank[];
  collaboratorInvoices: CompleteCollaboratorInvoice[];
  collaboratorProfiles: CompleteCollaboratorProfile[];
  tickets: CompleteCollaboratorTicket[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    orders: RelatedOrderModel.array(),
    accounts: RelatedAccountModel.array(),
    sessions: RelatedSessionModel.array(),
    Authenticator: RelatedAuthenticatorModel.array(),
    business: RelatedUserBusinessModel.array(),
    address: RelatedUserAddressModel.array(),
    cardBanks: RelatedCollaboratorCardBankModel.array(),
    collaboratorInvoices: RelatedCollaboratorInvoiceModel.array(),
    collaboratorProfiles: RelatedCollaboratorProfileModel.array(),
    tickets: RelatedCollaboratorTicketModel.array(),
  }),
);
