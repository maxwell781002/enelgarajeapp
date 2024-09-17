import { getOrderCurrentUser } from "@repo/model/repository/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { getTranslations } from "next-intl/server";
import { formatDate } from "@repo/ui/lib/date";
import EmptyOrders from "./empty";
import Link from "next/link";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page({ params: { locale } }: PageProps) {
  const baseUrl = `/${locale}`;
  const orders = await getOrderCurrentUser();
  const t = await getTranslations("Orders");
  if (!orders?.length) {
    return <EmptyOrders url={baseUrl} />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("identifier")}</TableHead>
          <TableHead>{t("status")}</TableHead>
          <TableHead>{t("total")}</TableHead>
          <TableHead>{t("sentAt")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order: any) => (
          <TableRow key={order.id}>
            <TableCell>
              <Link href={`${baseUrl}/order/${order.id}`}>
                {order.identifier}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`${baseUrl}/order/${order.id}`}>{order.status}</Link>
            </TableCell>
            <TableCell>
              <Link href={`${baseUrl}/order/${order.id}`}>${order.total}</Link>
            </TableCell>
            <TableCell>
              <Link href={`${baseUrl}/order/${order.id}`}>
                {formatDate(order.sentAt as Date)}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
