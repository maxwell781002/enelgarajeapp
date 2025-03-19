import { useEffect, useState } from "react";
import { Item } from "@repo/ui/components/chat-list";

export const useUpdateChatList = (
  businessId: string,
  refresh: () => Promise<void>,
  getChatList: () => Promise<Item[]>,
  items: Item[],
) => {
  const [chatList, setChatList] = useState(items);
  const [loading, setLoading] = useState(false);
  const doRefresh = async () => {
    setLoading(true);
    await refresh();
  };
  useEffect(() => {
    if (!loading) {
      return;
    }
    const intervalId = setInterval(async () => {
      const response = await fetch(
        `/api/whatsapp-connect?businessId=${businessId}`,
      );
      const data = await response.json();
      if (!data || !data.updatingChatList) {
        setLoading(false);
        clearInterval(intervalId); // Stop the interval
        setChatList(await getChatList());
      }
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [businessId, loading]);
  return {
    doRefresh,
    loading,
    chatList,
  };
};
