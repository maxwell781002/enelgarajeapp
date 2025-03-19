import EntitySelect, {
  EntitySelectProps,
  Item as BaseItem,
} from "@repo/ui/components/entity-select";
import { BtnDialogForm } from "@repo/ui/components/ui/btn-dialog-form";
import { Button } from "@repo/ui/components/button";
import { RefreshCwIcon } from "lucide-react";
import { useUpdateChatList } from "@repo/ui/components/chat-list/hook";

export type ChatListSelectProps = EntitySelectProps &
  Omit<RefreshChatListContentProps, "isRefreshing"> & {
    t: (key: string) => string;
    businessId: string;
    getChatList: () => Promise<Item[]>;
  };

export type Item = BaseItem;

export type RefreshChatListContentProps = {
  isRefreshing: boolean;
  refresh: () => any;
  toggleDialog?: () => void;
  t: (key: string) => string;
};

function RefreshChatListContent({
  isRefreshing,
  refresh,
  t,
}: RefreshChatListContentProps) {
  const doRefresh = async () => {
    await refresh();
  };
  return (
    <>
      {t("refreshChatListMessage")}
      <Button loading={isRefreshing} variant={"default"} onClick={doRefresh}>
        {t("refreshChatList")}
      </Button>
    </>
  );
}

export default function ChatListSelect({
  t,
  refresh,
  getChatList,
  businessId,
  items,
  ...props
}: ChatListSelectProps) {
  const {
    doRefresh,
    loading: isRefreshing,
    chatList,
  } = useUpdateChatList(businessId, refresh, getChatList, items);
  return (
    <div className="flex items-center gap-2">
      <EntitySelect {...props} items={chatList} />
      <BtnDialogForm
        Component={RefreshChatListContent}
        btnIcon={<RefreshCwIcon />}
        btnVariant={"default"}
        t={t}
        refresh={doRefresh}
        isRefreshing={isRefreshing}
        {...props}
      />
    </div>
  );
}
