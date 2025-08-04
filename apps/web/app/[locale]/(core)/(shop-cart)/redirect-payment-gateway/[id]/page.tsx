import { getOrderById } from "@repo/model/repository/order";
import { createPaymentGatewayLog } from "@repo/payment-method/factory-payment-gateway";
import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { getTranslations } from "next-intl/server";
import RedirectPayment from "./redirect";

export type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RedirectPaymentGateway({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrderById(id);
  const t = await getTranslations("PaymentGateway.redirect");
  const link =
    (await createPaymentGatewayLog(order as CompleteOrder)) ||
    `/checkout-successful/${id}`;
  return (
    <>
      <div className="pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-600">{t("description")}</p>
            <p className="text-sm text-gray-500 mt-2">{t("subDescription")}</p>
          </div>
        </div>
      </div>
      <RedirectPayment link={link} />
    </>
  );
}
