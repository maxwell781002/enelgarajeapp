import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function EmptyOrders({ url }: { url: string }) {
  const t = await getTranslations("Orders");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-card p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">{t("emptyOrders")}</h2>
          <p className="text-muted-foreground">{t("emptyOrdersDescription")}</p>
          <Link href={url} className="mt-4" prefetch={false}>
            <Button>{t("continueShopping")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
