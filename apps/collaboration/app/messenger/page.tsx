import { Smartphone } from "lucide-react";
import { BtnServerAction } from "@repo/ui/components/btn-server-action";
import { generateExternalSection } from "packages/model/repository/external-section";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import CopyToClipboard from "@repo/ui/components/copy-to-clipboard/copy-to-clipboard-text";

export default async function Messenger({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const t = await getTranslations("MessengerPage");
  const { token } = await searchParams;
  console.log(token, process.env.NEXT_AUTH_SECRET, process.env.AUTH_SECRET);
  const handleToken = async () => {
    "use server";
    const { token } = await generateExternalSection();
    return redirect(`/messenger?token=${token}`);
  };
  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center p-4 pt-8 md:pt-4">
      <div className="max-w-md w-full border-2 border-gray-200 rounded-lg p-6 md:p-8 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <Smartphone className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("title")}</h2>
        <p className="text-gray-600">{t("description")}</p>
        <div className="p-4">
          {!!token ? (
            <div className="flex justify-center border-2 border-gray-200 rounded-lg p-1">
              <CopyToClipboard text={token} />
            </div>
          ) : (
            <BtnServerAction action={handleToken}>
              {t("btnToken")}
            </BtnServerAction>
          )}
        </div>
      </div>
    </div>
  );
}
