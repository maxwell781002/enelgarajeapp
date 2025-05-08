import OrderItemPage from "@repo/ui/components/order-page/order-item-page";

export type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <OrderItemPage id={id} />;
}
