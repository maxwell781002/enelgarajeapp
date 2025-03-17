import { TMessagesRetrieve } from "@repo/model/types/whatsapp-connect";
import ShowMore from "@repo/ui/components/show-more";
import { Badge } from "@repo/ui/components/ui/badge";
import { useTranslations } from "next-intl";
import { Button } from "@repo/ui/components/button";
import { EyeIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/ui/components/ui/card";
import TableWrapper from "@repo/ui/components/table/wrapper";

export type TableMessagesProps = {
  messages: TMessagesRetrieve;
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  onSelect: (item: any) => void;
};

const dateString = (sent_at: string) => {
  const date = new Date(sent_at);
  return date.toDateString() + " " + date.toTimeString();
};

const getColumns = (
  onSelect: (item: any) => void,
  t: (text: string) => string,
) => [
  {
    header: t("table.date"),
    accessorKey: "sent_at",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      dateString(value),
  },
  {
    header: t("table.messages"),
    accessorKey: "messages",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      value.length,
  },
  {
    header: t("table.status"),
    accessorKey: "status",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => (
      <div className="flex flex-1 justify-end gap-1">
        <Badge className="bg-blue-500">{value}</Badge>
        <Button size="icon" onClick={() => onSelect(row)}>
          <EyeIcon />
        </Button>
      </div>
    ),
  },
];

export function TableMessages({
  messages,
  onSelect,
  loadMore,
  hasMore,
  loading,
}: TableMessagesProps) {
  const t = useTranslations("MessageBulk");
  const columns = getColumns(onSelect, t);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>{t("messageDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <TableWrapper columns={columns as any} data={messages.items} />
        {hasMore && (
          <div className="flex justify-end">
            <ShowMore onClick={loadMore} disabled={loading}>
              {t("table.showMore")}
            </ShowMore>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
