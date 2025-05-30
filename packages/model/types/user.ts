import {
  CollaboratorProfile,
  UserBusinessType,
} from "../prisma/generated/client";
import { CompleteUser } from "../prisma/zod";

export type UserWithCollaboratorProfile = {
  _collaboratorProfile: CollaboratorProfile;
  _userType?: UserBusinessType;
} & CompleteUser;
