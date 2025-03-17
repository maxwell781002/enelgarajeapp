import { TMessagesRetrieve } from "@repo/model/types/whatsapp-connect";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
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
  CardTitle,
} from "@repo/ui/components/ui/card";

export type TableMessagesProps = {
  messages: TMessagesRetrieve;
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  onSelect: (item: any) => void;
};

const dateString = ({ sent_at }: { sent_at: string }) => {
  const date = new Date(sent_at);
  return date.toDateString() + " " + date.toTimeString();
};

export function TableMessages({
  messages,
  onSelect,
  loadMore,
  hasMore,
  loading,
}: TableMessagesProps) {
  const t = useTranslations("MessageBulk");
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("messageTitle")}</CardTitle>
        <CardDescription>{t("messageDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-muted/50 hidden md:table-header-group">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Number menssages</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.items.map((message) => (
              <TableRow
                key={message.scheduled_time}
                className="flex flex-col md:table-row border-b md:border-b-0"
              >
                <TableCell className="font-medium">
                  {dateString(message)}
                </TableCell>
                <TableCell className="text-center">
                  {message.messages.length}
                </TableCell>
                <TableCell>
                  <div className="flex flex-1 justify-end gap-1">
                    <Badge className="bg-blue-500">{message.status}</Badge>
                    <Button size="icon" onClick={() => onSelect(message)}>
                      <EyeIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right">
                {hasMore && (
                  <ShowMore onClick={loadMore} disabled={loading}>
                    Ver más
                  </ShowMore>
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
