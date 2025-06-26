import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import Image from "next/image";
import PriceDisplay from "@repo/ui/components/prices/price";
import { useTranslations } from "next-intl";
import { useStore } from "@repo/ui/stores/index";
import { useShopCart } from "@repo/ui/stores/shop-cart";

export default function ProductList() {
  const t = useTranslations("Checkout");
  const items = useStore(useShopCart, (state) => state.items());
  return (
    <div>
      <h1 className="text-2xl font-bold">{t("products")}</h1>
      <div className="border border-gray-100 shadow-xs rounded-lg mt-4">
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
            {items?.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <div className="h-[64px] w-[64px] flex items-center justify-center">
                    <Image
                      src={(item.product.image as any).url}
                      alt={item.product.name}
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
  );
}
