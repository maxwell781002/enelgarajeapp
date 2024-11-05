import { LogOut, Store } from "lucide-react";
import { getTranslations } from "next-intl/server";
import WhatsappButton from "@repo/ui/components/whatsapp-button";
import {
  getCurrentUser,
  getUserAndBusinessById,
} from "@repo/model/repository/user";
import { signOut } from "@repo/model/lib/auth";
import { BtnServerAction } from "@repo/ui/components/btn-server-action";

export default async function Page() {
  const whatsappNumber = process.env.PHONE_ADMIN_CONTACT as string;
  const t = await getTranslations("NoHaveShop");
  const whatsappMessage = encodeURIComponent(t("textChat"));
  const user = await getCurrentUser();
  const refreshUser = await getUserAndBusinessById(user?.id as string);
  const logoutAction = async () => {
    "use server";
    return signOut();
  };
  const hasBusiness = refreshUser?.business?.length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Store className="w-16 h-16 mb-6 text-primary" />
      {!hasBusiness && (
        <>
          <h1 className="text-2xl font-bold mb-2 text-center">{t("title")}</h1>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            {t("message")}
          </p>
        </>
      )}
      {hasBusiness && (
        <div className="bg-gray-200 mt-5 flex p-4 flex-col items-center justify-center space-y-2 mb-8">
          <p className="text-muted-foreground text-center max-w-md">
            {t("alreadyHasShop")}
          </p>
          <BtnServerAction action={logoutAction} variant={"outline"}>
            <LogOut className="h-4 w-4 mr-2" />
            <div className="ml-2">{t("loginAgain")}</div>
          </BtnServerAction>
        </div>
      )}
      <WhatsappButton
        whatsappNumber={whatsappNumber}
        whatsappMessage={whatsappMessage}
        text={t("btnSubmit")}
      />
    </div>
  );
}
