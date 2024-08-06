import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/components/ui/table";
import { Label } from "@repo/ui/components/ui/label";
import { getTranslations } from "next-intl/server";
import { getCurrentOrder } from "@repo/model/repository/order";
import EmptyCart from "../../../../components/emptyCart";

type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

export default async function Component({
  params: { slug, locale },
}: PageProps) {
  const baseUrl = `/${locale}/${slug}`;
  const t = await getTranslations("Checkout");
  const order = await getCurrentOrder();
  if (!order || order.items.length === 0) {
    return <EmptyCart slug={baseUrl} />;
  }
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <form className="bg-background rounded-lg shadow-sm mt-4 space-y-4">
          <div>
            <Label htmlFor="name">{t("lblName")}</Label>
            <Input id="name" type="text" placeholder={t("phName")} />
          </div>
          <div>
            <Label htmlFor="phone">{t("lbPhone")}</Label>
            <Input id="phone" placeholder={t("phPhone")} />
          </div>
          <Button type="submit" className="w-full">
            {t("continue")}
          </Button>
        </form>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{t("products")}</h1>
        <div className="border shadow-sm rounded-lg mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("image")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("price")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow>
                  <TableCell>
                    <img
                      src={item.product.image}
                      width="64"
                      height="64"
                      alt={item.product.name}
                      className="aspect-square rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{t("total_cart")}</span>
        <span className="text-2xl font-bold">${order.total}</span>
      </div>
    </div>
  );
}
