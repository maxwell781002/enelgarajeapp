import { externalSectionRepository } from "@repo/model/repositories/external-section";
import { getCurrentUser } from "@repo/model/repository/user";

export const generateExternalSection = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return;
  }
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return externalSectionRepository.create({
    userId: user?.id,
    token,
    createdAt: new Date(),
  });
};

export const getExternalSection = async (token: string) => {
  return externalSectionRepository.getUserByToken(token);
};
