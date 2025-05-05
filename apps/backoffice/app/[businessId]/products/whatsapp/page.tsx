import {
  getChatList as getChatListServer,
  sendProducts,
  refreshChatList as refreshChatListServer,
} from "@repo/model/repository/whatsapp-connect";
import Configure from "./configure";
import BackPage from "@repo/ui/components/back-page";
import { revalidatePath } from "next/cache";

export type PageProps = {
  params: Promise<{
    businessId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { businessId } = await params;
  const chatList = await getChatListServer(businessId);
  const sendToWhatsapp = async (
    productIds: string[],
    date: string,
    chatId: string,
  ) => {
    "use server";
    revalidatePath(`/${businessId}/messages`);
    return sendProducts(productIds, businessId, chatId, date);
  };
  const refreshChatList = async () => {
    "use server";
    return refreshChatListServer(businessId);
  };
  const getChatList = async () => {
    "use server";
    return getChatListServer(businessId);
  };
  return (
    <BackPage href={`/${businessId}/products`} urlTitle="Ir a productos">
      <Configure
        action={sendToWhatsapp}
        businessId={businessId}
        chatList={chatList}
        refreshChatList={refreshChatList}
        getChatList={getChatList}
      />
    </BackPage>
  );
}
