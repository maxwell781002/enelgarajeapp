import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { formatDate } from "@repo/ui/lib/date";
import CardDisplay from "@repo/ui/components/card-display";
import { getCityByCode, getStateByCode } from "@repo/ui/lib/locations/index";
import PriceDisplay from "@repo/ui/components/prices/price";
import { TCurrency } from "@repo/model/types/enums";
import OrderProducts from "@repo/ui/components/order-page/order-products";
import { CompleteUser } from "@repo/model/zod/user";

export type ClientBackofficeOrderProps = {
  order: CompleteOrder;
};

export default async function ClientBackofficeOrder({
  order,
}: ClientBackofficeOrderProps) {
  const t = await getTranslations("OrderDetailBack");
  const address = order.orderAddress?.address;
  const addressItems = address
    ? [
        {
          label: t("address"),
          value: address.address,
        },
        {
          label: t("neighborhood"),
          value: address.neighborhood?.name,
        },
        {
          label: t("city"),
          value: getCityByCode(address.city)?.name,
        },
        {
          label: t("state"),
          value: getStateByCode(address.state)?.name,
        },
        {
          label: t("reference"),
          value: address.reference,
        },
      ]
    : [];
  const user = order.user as CompleteUser;
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <CardDisplay
          title={t("cardGeneral")}
          items={[
            { label: t("identifier"), value: order.identifier as string },
            {
              label: t("createdAt"),
              value: formatDate(order.createdAt as Date),
            },
            {
              label: t("total"),
              value: (
                <PriceDisplay
                  price={order.total as number}
                  currency={order.currency as TCurrency}
                />
              ),
            },
            {
              label: t("commission"),
              value: (
                <PriceDisplay
                  price={order.commission as number}
                  currency={order.currency as TCurrency}
                />
              ),
            },
            {
              label: t("shipping"),
              value: (
                <PriceDisplay
                  price={order.shipping as number}
                  currency={order.currency as TCurrency}
                />
              ),
            },
          ]}
        />
        <CardDisplay
          title={t("cardCustomer")}
          items={[
            { label: t("customerName"), value: user.name },
            { label: t("phone"), value: user.phone },
            ...addressItems,
          ]}
        />
        <OrderProducts order={order} />
      </div>
    </div>
  );
}
