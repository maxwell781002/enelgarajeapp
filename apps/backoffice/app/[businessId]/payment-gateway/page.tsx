import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";
import PaymentGatewayForm from "./form";
import { getPaymentGateways } from "@repo/model/repository/payment-gateway";
import { getPaymentGatewayDefaultValues } from "@repo/payment-method/factory-payment-gateway";
import { CompletePaymentGateway } from "packages/model/prisma/zod";

export default async function PaymentGateway({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const t = await getTranslations("PaymentGateway");
  const paymentGateways = await getPaymentGateways({ businessId });
  const defaultValues = getPaymentGatewayDefaultValues(
    paymentGateways as CompletePaymentGateway[],
  );
  const action = async (object: any) => {
    "use server";
    console.log(object);
    return object;
  };
  return (
    <BackPage href={`/${businessId}`} urlTitle={t("backTitle")}>
      <PaymentGatewayForm
        businessId={businessId}
        defaultValues={defaultValues}
        action={action}
      />
    </BackPage>
  );
}
