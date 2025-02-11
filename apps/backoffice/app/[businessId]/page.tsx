import BusinessDetail from "../../components/business-detail";

export default async function BusinessPage({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  return <BusinessDetail businessId={businessId} />;
}
