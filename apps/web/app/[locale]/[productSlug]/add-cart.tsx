"use client";

import { useOptimistic } from "react";
import { BtnAddCart } from "@repo/ui/components/add-cart";
import { useTranslations } from "next-intl";
import { IProduct } from "@repo/model/types/product";

type Props = {
  product: IProduct;
  add: () => any;
};

export function AddCart({ product, add }: Props) {
  const [optimisticProduct, setOptimisticProduct] = useOptimistic(product);
  const handleAdd = async () => {
    setOptimisticProduct({ ...product, _inCart: true });
    await add();
  };
  const t = useTranslations("Product");
  return <BtnAddCart action={handleAdd} product={optimisticProduct} />;
}
