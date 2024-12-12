import { UserIsNotCollaboratorError } from "../errors/bad-request";
import { businessRepository } from "../repositories/business";
import { collaboratorProfileRepository } from "../repositories/collaborator-profile";
import { orderRepository } from "../repositories/order";
import { UserBusinessType } from "../types/enums";

export async function updateCollaboratorProfile(
  userId: string,
  businessId: string,
) {
  const collaborator = businessRepository.isUserBusiness(
    userId,
    businessId,
    UserBusinessType.COLLABORATOR,
  );
  if (!collaborator) {
    throw new UserIsNotCollaboratorError(
      `User ${userId} is not collaborator of business ${businessId}`,
    );
  }
  const statistic = await orderRepository.getCollaboratorStatistic(
    businessId,
    userId,
  );
  return collaboratorProfileRepository.updateProfile(userId, businessId, statistic);
}
