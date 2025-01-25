import { CompleteOrder } from "@repo/model/zod/order";
import ClientBackofficeOrder, {
  ClientBackofficeOrderProps,
} from "@repo/ui/components/order-page/back-order/client-backoffice-order";
import CollaboratorOrder, {
  CollaboratorOrderProps,
} from "@repo/ui/components/order-page/back-order/collaborator-order";

export type BackOrderProps = ClientBackofficeOrderProps &
  CollaboratorOrderProps;

export default function BackOrder({ order, ...props }: BackOrderProps) {
  if (order.isCollaborator) {
    return <CollaboratorOrder order={order as CompleteOrder} {...props} />;
  }
  return <ClientBackofficeOrder {...props} order={order as CompleteOrder} />;
}
