import { sendProducts } from "@repo/model/repository/whatsapp-connect";
import Configure from "./configure";
import BackPage from "@repo/ui/components/back-page";

export type PageProps = {
  params: {
    businessId: string;
  };
};

export default async function Page({ params: { businessId } }: PageProps) {
  const sendToWhatsapp = async (productIds: string[], date: string) => {
    "use server";
    return sendProducts(productIds, businessId, date);
  };
  return (
    <BackPage href={`/${businessId}/products`} urlTitle="Ir a productos">
      <Configure action={sendToWhatsapp} businessId={businessId} />
    </BackPage>
  );
}
