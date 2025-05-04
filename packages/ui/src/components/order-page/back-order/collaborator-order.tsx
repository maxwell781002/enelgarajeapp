import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { formatDate } from "@repo/model/lib/date";
import CardDisplay from "@repo/ui/components/card-display";
import PriceDisplay from "@repo/ui/components/prices/price";
import { TCurrency } from "@repo/model/types/enums";
import OrderProducts, {
  OrderProductsProps,
} from "@repo/ui/components/order-page/order-products";
import { CompleteUser } from "@repo/model/zod/user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { getAddressData } from "@repo/ui/components/order-page/address-data";

export type CollaboratorOrderProps = {
  order: CompleteOrder;
} & OrderProductsProps;

export default async function CollaboratorOrder({
  order,
  ...props
}: CollaboratorOrderProps) {
  const t = await getTranslations("OrderDetailBack");
  const addressItems = await getAddressData(order);
  const ticket = order.ticket;
  const user = order.user as CompleteUser;
  return (
    <>
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
      <OrderProducts order={order} {...props} />
    </>
  );
}
