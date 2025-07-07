import { Loader2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import RedirectAfterLogin from "./redirect";

type PageProps = {
  searchParams: Promise<any>;
};

export default async function CompleteLogin({ searchParams }: PageProps) {
  const { redirectAfterLogin } = await searchParams;
  const t = await getTranslations("CompleteLogin");
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <RedirectAfterLogin redirectAfterLogin={redirectAfterLogin as string} />
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-xs text-muted-foreground">{t("comment")}</p>
        </div>
      </div>
    </div>
  );
}
