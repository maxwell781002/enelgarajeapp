"use client";
import { useTableContext } from "@repo/ui/context/table";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { CardContent } from "@repo/ui/components/ui/card";

export type TableLayoutProps = {
  title: string;
  children: React.ReactNode;
  buttons?: React.ReactNode;
  filter?: React.ReactNode;
};

export default function TableLayout({
  title,
  children,
  buttons,
  filter,
}: TableLayoutProps) {
  const { isListLoading } = useTableContext();
  return (
    <Card>
      <CardHeader className="px-6">
        <div className="flex flex-1 pb-2">
          <div>
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex-1 flex justify-end">{buttons}</div>
        </div>
        {!!filter && (
          <div className="flex flex-1 p-2 rounded border border-neutral-300 sm:bg-white sm:border-0 sm:rounded-none sm:p-0">
            {filter}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isListLoading ? <span>Loading</span> : children}
      </CardContent>
    </Card>
  );
}
