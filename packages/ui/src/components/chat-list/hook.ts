import { useEffect, useState } from "react";
import { Item } from "@repo/ui/components/chat-list/index";
import { useToggle } from "@repo/ui/hooks/useToggle";
import { useToast } from "@repo/ui/components/ui/use-toast";

export const useUpdateChatList = (
  businessId: string,
  refresh: () => Promise<void>,
  getChatList: () => Promise<Item[]>,
  items: Item[],
  t: (key: string) => string,
) => {
  const [chatList, setChatList] = useState(items);
  const [loading, setLoading] = useState(false);
  const [open, toggle] = useToggle(false);
  const { toast } = useToast();
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
        toast({
          title: t("chatListUpdated"),
        });
        toggle();
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
    open,
    toggle,
  };
};
