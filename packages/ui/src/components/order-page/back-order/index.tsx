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
import Messenger from "./messenger";
import CardDisplay from "@repo/ui/components/card-display";
import { UserBusinessType } from "@repo/model/types/enums";
import { getUserByBusinessIdAndType } from "@repo/model/repository/user";
import { setMessengerToOrder } from "@repo/model/repository/order";

export type BackOrderProps = ClientBackofficeOrderProps &
  CollaboratorOrderProps;

export default async function BackOrder({ order, ...props }: BackOrderProps) {
  const t = await getTranslations("OrderDetailBack");
  const messengers = await getUserByBusinessIdAndType(
    order.businessId as string,
    UserBusinessType.MESSENGER,
  );
  const content = order.isCollaborator ? (
    <CollaboratorOrder order={order as CompleteOrder} {...props} />
  ) : (
    <ClientBackofficeOrder {...props} order={order as CompleteOrder} />
  );
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <CardDisplay title={t("cardMessenger")}>
          <Messenger
            user={order.messenger}
            users={messengers}
            onUserChange={async (userId: string) => {
              "use server";
              return setMessengerToOrder(
                order.businessId as string,
                order.id as string,
                userId,
              );
            }}
          />
        </CardDisplay>
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
