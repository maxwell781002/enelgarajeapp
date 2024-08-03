import { getCurrentOrder } from "@repo/model/repository/order";
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
import EmptyCart from "./empty";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const order = await getCurrentOrder();
  if (!order || !order.items) {
    return <EmptyCart slug={slug} />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nombre</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order?.items.map((item: any, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item.product.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right">{item.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{order?.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
