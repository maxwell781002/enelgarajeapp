import BackPage from "@repo/ui/components/back-page";
import { useTranslations } from "next-intl";
import BtnConfirm from "@repo/ui/components/btn-confirm";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import Markdown from "@repo/ui/components/markdown";

export const dateString = (sent_at: string) => {
  const date = new Date(sent_at);
  return date.toDateString() + " " + date.toTimeString();
};

export type MessageBulkDetailProps = {
  onSelect: (item: any) => void;
  messageBulk: any;
  remove: (scheduledTime: string, ...args: any) => void;
  removing: boolean;
};

const MessageItem = ({ item }: any) => {
  return (
    <Card className="w-64 overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="relative w-full">
          <img src={item.media_url} alt="Card image" />
        </div>
        <div className="bg-white p-3">
          <Markdown className=" ">
            {item.message.replace(/\n/g, "\n\n").replace(/\*/g, "**")}
          </Markdown>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MessageBulkDetail({
  onSelect,
  messageBulk,
  remove,
  removing,
}: MessageBulkDetailProps) {
  const t = useTranslations("MessageBulk");
  console.log(messageBulk);
  const handleRemove = (...args: any) => {
    return remove(messageBulk.scheduled_time, ...args);
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
              />
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {messageBulk.messages.map((message: any, index: number) => (
            <MessageItem key={index} item={message} />
          ))}
        </div>
      </div>
    </BackPage>
  );
}
