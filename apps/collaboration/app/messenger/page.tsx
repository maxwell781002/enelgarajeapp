import { Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Messenger() {
  const t = useTranslations("MessengerPage");
  return (
    <div className="min-h-screen md:flex md:items-center md:justify-center p-4 pt-8 md:pt-4">
      <div className="max-w-md w-full border-2 border-gray-200 rounded-lg p-6 md:p-8 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <Smartphone className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("title")}</h2>
        <p className="text-gray-600">{t("description")}</p>
      </div>
    </div>
  );
}
