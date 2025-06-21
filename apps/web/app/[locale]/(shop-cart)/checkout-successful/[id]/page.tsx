import { getCurrentBusiness } from "@repo/model/repository/business";
import { getOrderById } from "@repo/model/repository/order";
import { CompleteOrder } from "@repo/model/zod/order";
import WhatsappButton from "@repo/ui/components/whatsapp-button";
import OrderDetail from "@repo/ui/components/order-page/order-detail";
import PaymentMethodDetail from "@repo/ui/components/payment-method/index";
import CheckoutSuccessfulPage from "@repo/ui/components/shop-cart/checkout-successful/page";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const t = await getTranslations("CheckoutSuccessful");
  const to = await getTranslations("OrderDetail");
  const business = await getCurrentBusiness();
  const order = await getOrderById(id);
  const whatsappMessage = encodeURIComponent(
    t("orderMessage", { reference: order?.identifier as string }),
  );
  return (
    <CheckoutSuccessfulPage order={order as CompleteOrder} business={business}>
      <>
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
          <WhatsappButton
            whatsappNumber={business.phone}
            whatsappMessage={whatsappMessage}
            text={t("btnWhatsappSubmit")}
          />
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/order"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {t("show_orders")}
              </Link>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {t("continue_shopping")}
              </Link>
            </div>
          </>
        )}
      </>
    </CheckoutSuccessfulPage>
  );
}
