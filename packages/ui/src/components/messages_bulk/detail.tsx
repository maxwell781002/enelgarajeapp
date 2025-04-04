import BackPage from "@repo/ui/components/back-page";
import { useTranslations } from "next-intl";
import BtnConfirm from "@repo/ui/components/btn-confirm";
import { Badge } from "@repo/ui/components/ui/badge";
import { formatDateZn } from "@repo/model/lib/date";
import { useToggle } from "@repo/ui/hooks/useToggle";
import { WhatsappItem } from "@repo/ui/components/social-networks-views/whatsapp";

export const dateString = (sent_at: string) => {
  const date = new Date(sent_at);
  return formatDateZn(date, 0);
};

export type MessageBulkDetailProps = {
  onSelect: (item: any) => void;
  messageBulk: any;
  remove: (scheduledTime: string, ...args: any) => void;
  removing: boolean;
};

export default function MessageBulkDetail({
  onSelect,
  messageBulk,
  remove,
  removing,
}: MessageBulkDetailProps) {
  const t = useTranslations("MessageBulk");
  console.log(messageBulk);
  const [open, toggle] = useToggle();
  const handleRemove = async (...args: any) => {
    await remove(messageBulk.scheduled_time, ...args);
    toggle();
  };
  return (
    <BackPage
      onClick={() => {
        onSelect(null);
      }}
      urlTitle={t("messageTitle")}
    >
      <div className="mb-4 border-b border-gray-300 pb-4 w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="font-bold mb-4 mr-2">
            {dateString(messageBulk.sent_at)}
          </h2>
          <div className="flex justify-between gap-2">
            <div>
              <Badge className="bg-blue-500">{messageBulk.status}</Badge>
            </div>
            {messageBulk.status === "PENDING" && (
              <BtnConfirm
                isLoading={removing}
                title={t("removeMessage")}
                description={t("removeMessageDescription")}
                textButton={t("removeMessage")}
                action={handleRemove}
                textError={t("removeMessageError")}
                open={open}
                toggle={toggle}
              />
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {messageBulk.messages.map((message: any, index: number) => (
            <WhatsappItem
              key={index}
              mediaUrl={message.media_url}
              message={message.message}
            />
          ))}
        </div>
      </div>
    </BackPage>
  );
}
