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
import EmptyCart from "../../../components/emptyCart";
import { CheckoutForm } from "./form";
import { TUserRegisterSchema } from "@repo/model/validation/user";
import { redirect } from "next/navigation";
import { auth } from "@repo/model/lib/auth";
import NoUser from "./no-user";
import Image from "@repo/ui/components/image";
import { userRepository } from "@repo/model/repositories/user";
import PriceDisplay from "@repo/ui/components/price";
import { getCurrentBusiness } from "@repo/model/repository/business";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Component({ params: { locale } }: PageProps) {
  const baseUrl = `/${locale}`;
  const t = await getTranslations("Checkout");
  const order = await getCurrentOrder();
  const business = await getCurrentBusiness();
  if (!order || order.items.length === 0) {
    return <EmptyCart url={baseUrl} />;
  }
  const checkout = async (data: TUserRegisterSchema) => {
    "use server";
    await checkoutOrder(data);
    await redirect(`${baseUrl}/checkout-successful?orderId=${order.id}`);
  };
  const session = await auth();
  if (!session) {
    return <NoUser />;
  }
  const user = await userRepository.getById(session.user.id);
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <CheckoutForm
          action={checkout}
          defaultValues={user}
          business={business}
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
                    <div className="h-[64px] w-[64px] flex items-center justify-center">
                      <Image
                        src={item.product.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>
                  <TableCell>
                    <PriceDisplay price={item.price} />
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{t("total_cart")}</span>
        <span className="text-2xl font-bold">
          <PriceDisplay price={order.total} />
        </span>
      </div>
    </div>
  );
}
