import OrderItemPage, {
  OrderItemPageProps,
} from "@repo/ui/components/order-page/order-item-page";

export type PageProps = {
  params: {
    businessId: string;
    id: string;
  };
};

export default async function Page({ params: { businessId, id } }: PageProps) {
  return <OrderItemPage baseUrl={`/${businessId}`} id={id} />;
}
