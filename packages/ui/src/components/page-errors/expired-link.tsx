import { AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PageExpiredLink() {
  const t = await getTranslations("ExpiredLink");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="text-center">
        <AlertCircle
          className="mx-auto h-24 w-24 text-red-500 mb-8"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
