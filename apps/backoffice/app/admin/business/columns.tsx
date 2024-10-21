import { ColumnDef } from "@repo/ui/components/table/index";
import { useTableContext } from "@repo/ui/context/table";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { CompleteBusiness } from "@repo/model/zod/business";
import BooleanValue from "@repo/ui/components/boolean-value";

type ActionProps = {
  row: CompleteBusiness;
};

function RowActions({ row }: ActionProps) {
  const { remove, update } = useTableContext();
  const t = useTranslations("Business");
  return (
    <BtnList>
      <Link href={"#"}>A</Link>
    </BtnList>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return <Link href={`/${row.id}`}>{value}</Link>;
    },
  },
  {
    header: "Activo",
    accessorKey: "active",
    cell: ({
      cell: { value, row },
    }: {
      cell: { value: boolean; row: any };
    }) => {
      return <BooleanValue value={value} />;
    },
  },
];
