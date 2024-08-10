import { CircleCheckIcon } from "@repo/ui/components/icons";
import OrderDetail from "@repo/ui/components/order-detail";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("CheckoutSuccessful");
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-xl mx-auto space-y-4">
              <CircleCheckIcon className="mx-auto size-12 text-green-500" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t("title")}
              </h1>
              <p className="text-muted-foreground md:text-xl">
                {t("description")}
              </p>
            </div>
          </div>
        </section>
        <OrderDetail />
      </main>
    </div>
  );
}
