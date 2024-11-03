import {
  getAllBusinessData,
  getCurrentBusiness,
} from "@repo/model/repository/business";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import { CircleCheckIcon, WhatsappIcon } from "@repo/ui/components/icons";
import OrderDetail from "@repo/ui/components/order-detail";
import PaymentMethodDetail from "@repo/ui/components/payment-method/index";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {
  searchParams: {
    orderId: string;
  };
  params: {
    locale: string;
  };
};

export default async function Page({
  searchParams: { orderId },
  params: { locale },
}: Props) {
  const baseUrl = `/${locale}`;
  const order = await getOrderById(orderId);
  const t = await getTranslations("CheckoutSuccessful");
  const to = await getTranslations("OrderDetail");
  const currentBusiness = await getCurrentBusiness();
  const business = await getAllBusinessData(currentBusiness?.id || "");
  const whatsappMessage = encodeURIComponent(
    t("orderMessage", { reference: order?.identifier }),
  );

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
        {business.defaultPaymentMethod && (
          <div className="mb-8">
            <PaymentMethodDetail data={business.defaultPaymentMethod} />
          </div>
        )}
        <OrderDetail
          order={order as CompleteOrder}
          titleLb={to("title")}
          orderLb={to("order")}
        />
        {business?.phone ? (
          <>
            <Button asChild className="flex items-center space-x-2">
              <a
                href={`https://wa.me/${business.phone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="w-5 h-5" />
                <span>{t("btnWhatsappSubmit")}</span>
              </a>
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href={`${baseUrl}/order`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {t("show_orders")}
              </Link>
              <Link
                href={baseUrl}
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {t("continue_shopping")}
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
