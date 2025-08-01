import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";
import PaymentGatewayForm from "./form";
import { PaymentGatewayType } from "@repo/model/types/enums";

const defaultValues = {
  forms: [
    {
      type: PaymentGatewayType.TROPIPAY,
      data: { clientId: "", clientSecret: "" },
    },
    {
      type: PaymentGatewayType.QVAPAY,
      data: { clientId: "", clientSecret: "" },
    },
  ],
};

export default async function PaymentGateway({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const t = await getTranslations("PaymentGateway");
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
