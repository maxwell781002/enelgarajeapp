import { getAllBusinessData } from "@repo/model/repository/business";
import { getOrderById } from "@repo/model/repository/order";
import { getCurrentUser } from "@repo/model/repository/user";
import { CompleteBusiness } from "@repo/model/zod/business";
import { CompleteOrder } from "@repo/model/zod/order";
import { CircleCheckIcon } from "@repo/ui/components/icons";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export type CheckoutSuccessfulPageProps = {
  business: CompleteBusiness;
  order: CompleteOrder;
} & PropsWithChildren;

export default async function CheckoutSuccessfulPage({
  business,
  order,
  children,
}: CheckoutSuccessfulPageProps) {
  const user = await getCurrentUser();
  if (!order) {
    return redirect("/");
  }
  if (order.userId !== user.id) {
    return redirect("/");
  }
  const t = await getTranslations("CheckoutSuccessful");
  business = await getAllBusinessData(business.id as string);

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12">
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
        {children}
      </main>
    </div>
  );
}
