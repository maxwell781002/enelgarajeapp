import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { CompleteProduct } from "@repo/model/zod/product";
import { CompleteOrder } from "@repo/model/zod/order";
import { addProductToOrder } from "@repo/model/repository/shop-cart";
import { createSelectors } from "@repo/ui/stores/index";

export type ShopCartStore = {
  order: CompleteOrder;
  add: (item: CompleteProduct) => void;
  numberOfItems: () => number;
  inCart: (id: string) => boolean;
};

const _useShopCart = create<ShopCartStore>()(
  persist(
    immer((set, get) => ({
      order: {
        items: [],
      },
      add: (item: CompleteProduct) =>
        set((state) => {
          state.order = addProductToOrder(state.order, item);
        }),
      numberOfItems: () =>
        get().order.items.reduce((acc, item) => acc + item.quantity, 0),
      inCart: (id: string) =>
        get().order.items.some((item) => item.product.id === id),
    })),
    {
      name: "shopCart",
    },
  ),
);

export const useShopCart = createSelectors(_useShopCart);
