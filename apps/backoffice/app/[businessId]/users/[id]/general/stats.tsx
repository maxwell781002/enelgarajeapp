import { CompleteUser } from "@repo/model/zod/user";
import { StatCard } from "./stat";
import { getTranslations } from "next-intl/server";
import PriceDisplay from "@repo/ui/components/prices/price";

export default async function Stats({ user }: { user: CompleteUser }) {
  const t = await getTranslations("UserDetail");
  return (
    <div className="flex flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title={t("historicalProfit")}
        value={<PriceDisplay price={10} />}
      />
      <StatCard
        title={t("totalBusinessProfit")}
        value={<PriceDisplay price={10} />}
      />
      <StatCard title={t("totalPendingInvoiceToConfirm")} value={23} />
      <StatCard title={t("totalOrderForPayment")} value={23} />
    </div>
  );
}
