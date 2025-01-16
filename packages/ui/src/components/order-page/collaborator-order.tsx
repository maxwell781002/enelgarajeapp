import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { formatDate } from "@repo/ui/lib/date";
import CardDisplay from "@repo/ui/components/card-display";
import { getCityByCode, getStateByCode } from "@repo/ui/lib/locations/index";
import PriceDisplay from "@repo/ui/components/prices/price";
import { TCurrency } from "@repo/model/types/enums";
import OrderProducts from "@repo/ui/components/order-page/order-products";
import { CompleteUser } from "@repo/model/zod/user";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

export type CollaboratorOrderProps = {
  order: CompleteOrder;
};

export default async function CollaboratorOrder({
  order,
}: CollaboratorOrderProps) {
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
  const ticket = order.ticket;
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
              label: ticket && t("deliveryDate"),
              value: ticket && formatDate(ticket.deliveryDate as Date),
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
          title={t("cardCollaborator")}
          items={[
            { label: t("collaboratorName"), value: user.name },
            { label: t("phone"), value: user.phone },
          ]}
        />
        {!!ticket && (
          <>
            <CardDisplay
              title={t("cardCustomer")}
              items={[
                { label: t("customerName"), value: ticket?.customer?.name },
                {
                  label: t("identification"),
                  value: ticket?.customer?.identification,
                },
                { label: t("phone"), value: ticket?.phone },
                ...addressItems,
              ]}
            />
            <CardDisplay
              title={t("cardPayment")}
              items={[
                {
                  label: t("currency"),
                  value: ticket?.currency,
                },
                {
                  label: t("formOfPayment"),
                  value: ticket?.formOfPayment && t(ticket?.formOfPayment),
                },
              ]}
            />
            {ticket?.nota && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{t("cardNota")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{ticket?.nota}</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
        <OrderProducts order={order} />
      </div>
    </div>
  );
}
