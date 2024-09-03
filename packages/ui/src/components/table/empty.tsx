import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { TableIcon, PlusCircle } from "lucide-react";

export type EmptyTableProps = {
  emptyHasButton?: boolean;
  emptyTitle: string;
  emptyDescription: string;
  emptyBtnText?: string;
};

export default function EmptyTable({
  emptyHasButton = false,
  emptyTitle,
  emptyDescription,
  emptyBtnText,
}: EmptyTableProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <TableIcon className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          {emptyTitle}
        </h2>
        <p className="text-muted-foreground mb-6">{emptyDescription}</p>
        {emptyHasButton && (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {emptyBtnText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
