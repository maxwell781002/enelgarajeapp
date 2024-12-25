import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { CompleteProduct } from "@repo/model/zod/product";
import {
  addProductToOrder,
  orderCommission,
  orderTotal,
  removeItem,
  setQuantity,
  ShopCartOrder,
  ShopCartOrderItem,
} from "@repo/model/repository/shop-cart";
import { createSelectors } from "@repo/ui/stores/index";

const initialState: { order: ShopCartOrder } = {
  order: {
    items: [],
    total: 0,
  },
};

export type ShopCartStore = {
  currentBusinessId: string;
  byBusiness: Record<string, ShopCartOrder>;
  order: ShopCartOrder;
  add: (item: CompleteProduct) => void;
  numberOfItems: () => number;
  commission: () => number;
  inCart: (id: string) => boolean;
  items: () => ShopCartOrderItem[];
  hasItems: () => boolean;
  orderTotal: () => number;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  changeBusiness: (businessId: string) => void;
};

const _useShopCart = create<ShopCartStore>()(
  persist(
    immer((set, get) => ({
      byBusiness: {},
      currentBusinessId: "",
      ...initialState,
      changeBusiness: (businessId: string) =>
        set((state) => {
          if (state.currentBusinessId) {
            state.byBusiness[state.currentBusinessId] = state.order;
          }
          state.currentBusinessId = businessId;
          // @ts-ignore
          state.order = state.byBusiness[businessId] || initialState.order;
        }),
      add: (item: CompleteProduct) =>
        set((state) => {
          // @ts-ignore
          state.order = addProductToOrder(state.order, item);
        }),
      clear: () => set({ ...initialState }),
      numberOfItems: () =>
        get().order.items.reduce((acc, item) => acc + item.quantity, 0),
      inCart: (id: string) =>
        get().order.items.some((item) => item.product.id === id),
      items: () => get().order.items,
      orderTotal: () => orderTotal(get().order),
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
    })),
    {
      name: "shopCart",
    },
  ),
);

export const useShopCart = createSelectors(_useShopCart);
