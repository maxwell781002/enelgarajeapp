import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { formatDate } from "@repo/ui/lib/date";
import CardDisplay from "@repo/ui/components/card-display";
import { getCityByCode, getStateByCode } from "@repo/ui/lib/locations/index";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";
import PriceDisplay from "@repo/ui/components/prices/price";
import { TCurrency } from "@repo/model/types/enums";

export type CollaboratorOrderProps = {
  order: CompleteOrder;
};

export default async function CollaboratorOrder({
  order,
}: CollaboratorOrderProps) {
  const t = await getTranslations("CollaboratorOrder");
  const address = order.orderAddress.address;
  const addressItems = order.orderAddress.address
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
      ]
    : [];
  const ticket = order.ticket;
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
              label: t("deliveryDate"),
              value: formatDate(ticket?.deliveryDate as Date),
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
              label: t("total"),
              value: (
                <PriceDisplay
                  price={order.total as number}
                  currency={order.currency as TCurrency}
                />
              ),
            },
          ]}
        />
        <CardDisplay
          title={t("cardCollaborator")}
          items={[
            { label: t("collaboratorName"), value: order.user.name },
            { label: t("phone"), value: order.user.phone },
          ]}
        />
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
        <Card>
          <CardHeader>
            <CardTitle>{t("cardProducts")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">{t("product")}</th>
                    <th className="text-left p-2">{t("quantity")}</th>
                    <th className="text-left p-2">{t("price")}</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item: CompleteOrderProduct, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.product.name}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">
                        <PriceDisplay
                          price={item.price}
                          currency={order.currency as TCurrency}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
