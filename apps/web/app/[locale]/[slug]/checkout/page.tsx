import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/components/ui/table";
import { getTranslations } from "next-intl/server";
import { checkoutOrder, getCurrentOrder } from "@repo/model/repository/order";
import EmptyCart from "../../../../components/emptyCart";
import { CheckoutForm } from "./form";
import { getOrCreateUser } from "@repo/model/repository/user";
import { TUserRegisterSchema } from "@repo/model/validation/user";
import { redirect } from "next/navigation";

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
  const user = await getOrCreateUser();
  const checkout = async (data: TUserRegisterSchema) => {
    "use server";
    await checkoutOrder(data, slug);
    await redirect(`${baseUrl}/checkout-successful?orderId=${order.id}`);
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <CheckoutForm
          action={checkout}
          defaultValues={user as TUserRegisterSchema}
        />
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
                <TableRow key={item.productId}>
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
