import { sendProducts } from "@repo/model/repository/whatsapp-connect";
import Configure from "./configure";
import BackPage from "@repo/ui/components/back-page";
import { revalidatePath } from "next/cache";

export type PageProps = {
  params: {
    businessId: string;
  };
};

export default async function Page({ params: { businessId } }: PageProps) {
  const sendToWhatsapp = async (productIds: string[], date: string) => {
    "use server";
    revalidatePath(`/${businessId}/messages`);
    return sendProducts(productIds, businessId, date);
  };
  return (
    <BackPage href={`/${businessId}/products`} urlTitle="Ir a productos">
      <Configure action={sendToWhatsapp} businessId={businessId} />
    </BackPage>
  );
}
