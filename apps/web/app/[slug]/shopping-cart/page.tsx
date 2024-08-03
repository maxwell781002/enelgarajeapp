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

const products = [
  {
    id: 1,
    name: "Pizza Margherita",
    quantity: 1,
    price: 200,
    total: 200,
  },
  {
    id: 2,
    name: "Pizza Funghi",
    quantity: 1,
    price: 250,
    total: 250,
  },
  {
    id: 3,
    name: "Pizza Quattro Formaggi",
    quantity: 1,
    price: 300,
    total: 300,
  },
  {
    id: 4,
    name: "Pizza Quattro Stagioni",
    quantity: 2,
    price: 350,
    total: 700,
  },
];

export default function Page() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nombre</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right">{item.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
