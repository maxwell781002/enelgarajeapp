import { XCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Page404() {
  const t = await getTranslations("404Page");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="text-center">
        <XCircle
          className="mx-auto h-24 w-24 text-red-500 mb-8"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
      </div>
    </div>
  );
}
