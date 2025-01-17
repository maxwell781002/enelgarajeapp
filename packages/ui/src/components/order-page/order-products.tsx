import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/prices/price";
import { TCurrency } from "@repo/model/types/enums";
import { CompleteOrder } from "@repo/model/zod/order";
import { getTranslations } from "next-intl/server";

type TProductUrlGenerate = (item: CompleteOrderProduct) => string;

const ProductLink = ({
  item,
  baseUrl,
  children,
}: {
  item: CompleteOrderProduct;
  baseUrl: TProductUrlGenerate;
} & PropsWithChildren) => {
  const url = baseUrl(item);
  return (
    <Link
      href={url}
      className="bg-white hover:bg-gray-100 text-gray-800 h-10 w-10 text-blue-500 underline hover:text-blue-700 transition-colors"
      aria-label="View"
    >
      {children}
    </Link>
  );
};

export type OrderProductsProps = {
  order: CompleteOrder;
  baseUrl: TProductUrlGenerate;
};

export default async function OrderProducts({
  order,
  baseUrl,
}: OrderProductsProps) {
  const t = await getTranslations("OrderDetailBack");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("cardProducts")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">{t("image")}</th>
                <th className="text-left p-2">{t("product")}</th>
                <th className="text-left p-2">{t("quantity")}</th>
                <th className="text-left p-2">{t("price")}</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: CompleteOrderProduct, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <ProductLink item={item} baseUrl={baseUrl}>
                      <Image
                        src={item.product.image}
                        width={48}
                        height={48}
                        alt={item.product.name}
                      />
                    </ProductLink>
                  </td>
                  <td className="p-2">
                    <ProductLink item={item} baseUrl={baseUrl}>
                      {item.product.name}
                    </ProductLink>
                  </td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    <PriceDisplay
                      price={item.price}
                      currency={order.currency as TCurrency}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
