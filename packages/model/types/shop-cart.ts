import { CompleteOrderProduct } from "../prisma/zod";
import { CompleteOrder } from "../prisma/zod/order";

export type ShopCartOrder = {
  numberOfItems: number | undefined;
  items: ShopCartItem[];
  hasProductOutOfStock: boolean;
} & CompleteOrder;

export type ShopCartItem = {
  total: number;
  outOfStock: boolean;
} & CompleteOrderProduct;
