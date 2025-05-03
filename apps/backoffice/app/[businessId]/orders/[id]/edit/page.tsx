import BackPage from "@repo/ui/components/back-page";

type OrderEditPageProps = {
  params: {
    businessId: string;
    id: string;
  };
};

export default function OrderEditPage({
  params: { id, businessId },
}: OrderEditPageProps) {
  return (
    <BackPage href={`/${businessId}/orders/${id}`} urlTitle="Ir a la orden">
      <div>
        OrderEditPage {id} {businessId}
      </div>
    </BackPage>
  );
}
