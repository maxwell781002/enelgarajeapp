"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/components/ui/table";
import { CheckoutForm } from "./form";
import { AddressType, TUserRegisterSchema } from "@repo/model/validation/user";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/price";
import { CompleteBusiness } from "@repo/model/zod/business";
import { CompleteAddress } from "@repo/model/zod/address";
import { ShopCartOrder } from "@repo/model/types/shop-cart";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCheckoutForm, useCurrentAddress, useNeighborhoods } from "./hooks";

type CheckoutViewProps = {
  checkout: (data: TUserRegisterSchema) => Promise<any>;
  user: TUserRegisterSchema;
  business: CompleteBusiness;
  addresses: CompleteAddress[];
  order: ShopCartOrder;
};

export default function CheckoutView({
  checkout,
  user,
  business,
  addresses,
  order,
}: CheckoutViewProps) {
  const t = useTranslations("Checkout");
  const [addressType, setAddressType] = useState(
    addresses.length ? AddressType.selectAddress : AddressType.newAddress,
  );
  const { form, handleAction, shopCartHasError } = useCheckoutForm(
    user,
    business,
    addressType,
    order,
    checkout,
  );
  const { city, neighborhoodId } = useCurrentAddress(form, addressType);
  const { neighborhoods, currentNeighborhood } = useNeighborhoods(
    city,
    business.id,
    neighborhoodId,
    form,
  );
  console.log(neighborhoodId, currentNeighborhood);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <CheckoutForm
          action={handleAction}
          defaultValues={user}
          business={business}
          addresses={addresses}
          shopCartHasError={shopCartHasError}
          neighborhoods={neighborhoods}
          setAddressType={setAddressType}
          form={form}
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
