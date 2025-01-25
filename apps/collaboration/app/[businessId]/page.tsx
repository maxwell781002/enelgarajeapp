import { userRepository } from "@repo/model/repositories/user";
import { getCurrentUser } from "@repo/model/repository/user";
import CardTotal from "@repo/ui/components/cardTotal";
import { getTranslations } from "next-intl/server";
import { DockIcon, ShoppingCart, DollarSign } from "lucide-react";
import CollaboratorInvoice from "./_invoices";
import PriceDisplay from "@repo/ui/components/prices/price";

export type Props = {
  searchParams: any;
  params: {
    businessId: string;
  };
};

export default async function Home({
  searchParams,
  params: { businessId },
}: Props) {
  const t = await getTranslations("Dashboard");
  const currentUser = await getCurrentUser();
  const user = await userRepository.getUserWithCollaboratorProfile(
    currentUser.id,
    businessId,
  );
  return (
    <>
      <div className="mb-4 grid gap-4 md:grid-cols-1 lg:grid-cols-4">
        <CardTotal
          title={t("historicalProfit")}
          Icon={DollarSign}
          value={
            <PriceDisplay price={user._collaboratorProfile.historicalProfit} />
          }
        />
        <CardTotal
          title={t("totalOrderForPayment")}
          Icon={ShoppingCart}
          value={user._collaboratorProfile.totalOrderForPayment}
        />
        <CardTotal
          title={t("totalPendingInvoiceToConfirm")}
          Icon={DockIcon}
          value={user._collaboratorProfile.totalPendingInvoiceToConfirm}
        />
        <CardTotal
          title={t("totalPaymentReferred")}
          Icon={DockIcon}
          value={user._collaboratorProfile.totalPaymentReferred}
        />
      </div>
      <CollaboratorInvoice
        businessId={businessId}
        collaboratorId={currentUser.id}
        searchParams={searchParams}
      />
    </>
  );
}
