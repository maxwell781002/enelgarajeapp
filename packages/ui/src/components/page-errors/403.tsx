import { LogOut, ShieldX } from "lucide-react";
import WhatsappButton from "@repo/ui/components/whatsapp-button";
import { getTranslations } from "next-intl/server";
import { signOut } from "@repo/model/lib/auth";
import { BtnServerAction } from "@repo/ui/components/btn-server-action";

export default async function Page403() {
  const whatsappNumber = process.env.PHONE_ADMIN_CONTACT as string;
  const t = await getTranslations("403Page");
  const whatsappMessage = encodeURIComponent(t("textChat"));
  const logoutAction = async () => {
    "use server";
    return signOut();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="text-center">
        <ShieldX
          className="mx-auto h-24 w-24 text-red-500 mb-8"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <BtnServerAction
          action={logoutAction}
          className="mb-8"
          variant={"outline"}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <div className="ml-2">{t("loginAgain")}</div>
        </BtnServerAction>
        <p className="text-lg text-gray-600 mb-4">{t("contactSupport")}</p>
        <WhatsappButton
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
          text={t("btnWhatsappSubmit")}
        />
      </div>
    </div>
  );
}
