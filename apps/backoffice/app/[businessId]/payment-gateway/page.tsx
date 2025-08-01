import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";
import PaymentGatewayForm from "./form";
import {
  getPaymentGateways,
  savePaymentGateways,
} from "@repo/payment-method/actions";
import { getPaymentGatewayDefaultValues } from "@repo/payment-method/factory-payment-gateway";
import { CompletePaymentGateway } from "@repo/model/zod/paymentgateway";

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
    return savePaymentGateways(object);
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
