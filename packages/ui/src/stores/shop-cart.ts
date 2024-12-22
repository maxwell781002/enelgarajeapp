import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { CompleteProduct } from "@repo/model/zod/product";
import { CompleteOrder } from "@repo/model/zod/order";
import {
  addProductToOrder,
  orderCommission,
  orderItems,
  orderSubTotal,
  orderTotal,
  removeItem,
  setQuantity,
  ShopCartOrderItem,
} from "@repo/model/repository/shop-cart";
import { createSelectors } from "@repo/ui/stores/index";

export type ShopCartStore = {
  order: CompleteOrder;
  add: (item: CompleteProduct) => void;
  numberOfItems: () => number;
  commission: () => number;
  inCart: (id: string) => boolean;
  items: () => ShopCartOrderItem[];
  hasItems: () => boolean;
  hasProductOutOfStock: () => boolean;
  orderSubTotal: () => number;
  orderTotal: (addCommission: boolean) => number;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
};

const _useShopCart = create<ShopCartStore>()(
  persist(
    immer((set, get) => ({
      order: {
        items: [],
        total: 0,
      },
      add: (item: CompleteProduct) =>
        set((state) => {
          state.order = addProductToOrder(state.order, item);
        }),
      numberOfItems: () =>
        get().order.items.reduce((acc, item) => acc + item.quantity, 0),
      inCart: (id: string) =>
        get().order.items.some((item) => item.product.id === id),
      items: () => get().order.items,
      orderSubTotal: () => orderSubTotal(get().order),
      orderTotal: (addCommission: boolean) => orderTotal(get().order, addCommission),
      commission: () => orderCommission(get().order),
      hasItems: () => get().order.items.length > 0,
      remove: (id: string) =>
        set((state) => {
          state.order.items = removeItem(state.order, id);
        }),
      setQuantity: (id: string, quantity: number) =>
        set((state) => {
          state.order.items = setQuantity(state.order, id, quantity);
        }),
      hasProductOutOfStock: () => {
        //TODO implement it
        return false;
      },
    })),
    {
      name: "shopCart",
    },
  ),
);

export const useShopCart = createSelectors(_useShopCart);
