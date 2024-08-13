"use client";

import { useOptimistic } from "react";
import { BtnAddCart } from "@repo/ui/components/add-cart";
import { CheckIcon } from "@repo/ui/components/icons";
import { useTranslations } from "next-intl";

type Props = {
  inCart: boolean;
  add: () => any;
};

export function AddCart({ inCart, add }: Props) {
  const [optimisticInCart, setOptimisticInCart] = useOptimistic(inCart);
  const handleAdd = async () => {
    setOptimisticInCart(true);
    await add();
  };
  const t = useTranslations("Product");
  return (
    <div className="flex justify-end gap-4">
      {optimisticInCart && (
        <div className="flex items-center gap-2">
          <div className="bg-red-600 rounded-full p-1">
            <CheckIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <strong>{t("inCart")}</strong>
        </div>
      )}
      <BtnAddCart action={handleAdd} />
    </div>
  );
}
