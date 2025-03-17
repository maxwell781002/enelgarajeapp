import BackPage from "@repo/ui/components/back-page";
import MessagesBulkItem from "@repo/ui/components/messages_bulk/message";

export type MessageBulkDetailProps = {
  onSelect: (item: any) => void;
  messagesBulk: any;
  handleRemove: (scheduledTime: string, ...args: any) => void;
  removing: boolean;
};

export default function MessageBulkDetail({
  onSelect,
  messagesBulk,
  handleRemove,
  removing,
}: MessageBulkDetailProps) {
  return (
    <BackPage
      onClick={() => {
        onSelect(null);
      }}
      urlTitle="Mensajes por lotes"
    >
      <div className="pr-4 -mr-4 flex flex-wrap gap-2">
        <MessagesBulkItem
          key={messagesBulk.scheduled_time}
          messageBulk={messagesBulk}
          remove={handleRemove}
          removing={removing}
        />
      </div>
    </BackPage>
  );
}
