import { CollaboratorProfile } from "../prisma/generated/client";
import { CompleteUser } from "../prisma/zod";

export type UserWithCollaboratorProfile = {
  _collaboratorProfile: CollaboratorProfile;
} & CompleteUser;
