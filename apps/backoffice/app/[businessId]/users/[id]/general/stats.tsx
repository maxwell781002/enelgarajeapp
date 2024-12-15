import { StatCard } from "./stat";
import { getTranslations } from "next-intl/server";
import PriceDisplay from "@repo/ui/components/prices/price";
import { UserWithCollaboratorProfile } from "@repo/model/types/user";

export default async function Stats({
  user,
}: {
  user: UserWithCollaboratorProfile;
}) {
  const t = await getTranslations("UserDetail");
  return (
    <div className="flex flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title={t("historicalProfit")}
        value={
          <PriceDisplay price={user._collaboratorProfile.historicalProfit} />
        }
      />
      <StatCard
        title={t("totalBusinessProfit")}
        value={
          <PriceDisplay price={user._collaboratorProfile.totalBusinessProfit} />
        }
      />
      <StatCard
        title={t("totalPendingInvoiceToConfirm")}
        value={user._collaboratorProfile.totalPendingInvoiceToConfirm}
      />
      <StatCard
        title={t("totalOrderForPayment")}
        value={user._collaboratorProfile.totalOrderForPayment}
      />
    </div>
  );
}
