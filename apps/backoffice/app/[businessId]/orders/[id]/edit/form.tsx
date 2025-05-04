"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Separator } from "@repo/ui/components/ui/separator";
import { CompleteOrder } from "@repo/model/zod/order";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/prices/price";
import QuantitySetter from "@repo/ui/components/shop-cart/shopping-cart/set-quantity";
import { BtnConfirm } from "@repo/ui/components/ui/btn-confirm";
import { useTranslations } from "next-intl";
import { OrderProduct } from "@repo/model/prisma/generated/client/index.d";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";
import { Alert } from "@repo/ui/components/ui/alert";
import Totals from "@repo/ui/components/shop-cart/checkout/total";
import AlertMessage from "@repo/ui/components/alert-message";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { redirect } from "next/navigation";

const getPrice = (item: OrderProduct) => item.customPrice || item.originalPrice;

export default function OrderProductForm({
  order,
  action,
}: {
  order: CompleteOrder;
  action: (items: CompleteOrderProduct[], changedOrderNote: string) => void;
}) {
  const [items, setItems] = useState<OrderProduct[]>(order.items);
  const [changedOrderNote, setChangedOrderNote] = useState<string>("");
  const t = useTranslations("OrderItemUpdate");
  const [shopCartHasError, setShopCartHasError] = useState(false);
  const handleRemove = (productId: string) => {
    setItems((prev) => prev.filter((item) => productId !== item.productId));
  };
  const totalItem = items.reduce(
    (acc, item) => acc + getPrice(item) * item.quantity,
    0,
  );
  const total = totalItem + order.shipping;
  const changeQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };
  const [saving, startSaving] = useTransition();
  const handleSubmit = () => {
    startSaving(async () => {
      const result = await action(items, changedOrderNote);
      if (result?.error) {
        return setShopCartHasError(true);
      }
      return redirect(`/${order.businessId}/orders/${result.id}`);
    });
  };
  const handleRestore = () => {
    setItems(order.items);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <div className="space-y-4">
        <Textarea
          value={changedOrderNote}
          onChange={(e) => setChangedOrderNote(e.target.value)}
          placeholder={t("orderNotePlaceholder")}
          label={t("orderNoteLabel")}
          className="w-full"
        />
        {shopCartHasError && (
          <AlertMessage
            variant="destructive"
            text={t("errors.has_out_of_stock")}
          />
        )}
        {items.length > 0 ? (
          items.map((item) => (
            <Card key={item.productId} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-base md:text-lg truncate">
                      {item.product.name}
                    </h3>
                    <PriceDisplay
                      price={getPrice(item)}
                      classNameText="text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                    <QuantitySetter
                      quantity={item.quantity}
                      changeProductQuantity={(quantity) =>
                        changeQuantity(item.productId, quantity)
                      }
                    />
                    <BtnConfirm
                      btnIcon={<Trash2 className="h-4 w-4" />}
                      title={t("remove_dialog.title")}
                      description={t("remove_dialog.description")}
                      action={() => handleRemove(item.productId)}
                      btnCancelText={t("remove_dialog.cancel")}
                      btnContinueText={t("remove_dialog.continue")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center p-4 bg-white">
            <Alert variant={"destructive"}>{t("errorProductEmpty")}</Alert>
          </div>
        )}
      </div>
      {items.length > 0 && (
        <>
          <Separator className="my-6" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Totals
                shippingPrice={order.shipping}
                subtotal={totalItem}
                total={total}
                wantDomicile={!!order.shipping}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
              <Button
                type="button"
                onClick={handleRestore}
                variant="outline"
                className="w-full sm:w-auto"
              >
                {t("restore")}
              </Button>
              <Button
                loading={saving}
                loadingText={t("btnUpdateLoading")}
                onClick={handleSubmit}
                className="w-full sm:w-auto"
              >
                {t("btnUpdate")}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
