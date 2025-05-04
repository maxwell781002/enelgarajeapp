import { CompleteOrder } from "@repo/model/zod/order";
import ClientBackofficeOrder, {
  ClientBackofficeOrderProps,
} from "@repo/ui/components/order-page/back-order/client-backoffice-order";
import CollaboratorOrder, {
  CollaboratorOrderProps,
} from "@repo/ui/components/order-page/back-order/collaborator-order";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { getTranslations } from "next-intl/server";

export type BackOrderProps = ClientBackofficeOrderProps &
  CollaboratorOrderProps;

export default async function BackOrder({ order, ...props }: BackOrderProps) {
  const t = await getTranslations("OrderDetailBack");
  const content = order.isCollaborator ? (
    <CollaboratorOrder order={order as CompleteOrder} {...props} />
  ) : (
    <ClientBackofficeOrder {...props} order={order as CompleteOrder} />
  );
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        {content}
        {!!order.changedOrderNote && (
          <Card>
            <CardHeader>
              <CardTitle>{t("cardChangedOrderNote")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.changedOrderNote as string}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
