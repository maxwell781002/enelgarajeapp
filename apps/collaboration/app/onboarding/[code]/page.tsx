import { auth, signOut } from "@repo/model/lib/auth";
import {
  businessUserLink,
  ErrorType,
  findInvitationLink,
} from "@repo/model/repository/invitation-link";
import { redirect } from "next/navigation";
import Form from "./form";
import { businessRepository } from "@repo/model/repositories/business";
import { BtnServerAction } from "@repo/ui/components/btn-server-action";
import { LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AlertCircle } from "lucide-react";

export type OnboardingProps = {
  params: {
    code: string;
  };
};

export default async function Onboarding({ params }: OnboardingProps) {
  const { user } = await auth();
  const t = await getTranslations("InvitationLink");
  const businessIds = await businessRepository.getBusinessIdByUserCollaborator(
    user.id,
  );
  const alreadyOnboarding = businessIds.includes(params.code);
  const invitationLink = alreadyOnboarding
    ? true
    : await findInvitationLink(user.id, params.code);
  if (invitationLink == ErrorType.INVITATION_LINK_NOT_FOUND) {
    return redirect("/errors/404");
  }
  if (invitationLink === ErrorType.LINK_EXPIRED) {
    return redirect("/errors/expired-link");
  }
  if (invitationLink === ErrorType.USER_ALREADY_EXISTS) {
    return redirect("/errors/already-collaborator");
  }
  const action = async (data: any) => {
    "use server";
    await businessUserLink({ id: user.id, ...data }, params.code);
    return redirect(`/onboarding/${invitationLink.businessId}`);
  };
  const logoutAction = async () => {
    "use server";
    await signOut();
  };
  return (
    <>
      {alreadyOnboarding ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
          <div className="text-center">
            <AlertCircle
              className="mx-auto h-24 w-24 text-red-500 mb-8"
              aria-hidden="true"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              {t("description")}
            </p>
            <BtnServerAction action={logoutAction}>
              <LogOut className="h-4 w-4 mr-2" />
              <div className="ml-2">{t("loginAgain")}</div>
            </BtnServerAction>
          </div>
        </div>
      ) : (
        <Form user={user} business={invitationLink.business} action={action} />
      )}
    </>
  );
}
