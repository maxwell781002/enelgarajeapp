import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { CompleteProduct } from "@repo/model/zod/product";
import {
  addProductToOrder,
  hasItemWithErrors,
  orderCommission,
  orderTotal,
  removeItem,
  setCustomPrice,
  setQuantity,
  ShopCartOrder,
  ShopCartOrderItem,
} from "@repo/model/repository/shop-cart";
import { createSelectors } from "@repo/ui/stores/index";
import { useGTMEvent } from "../google-analytics/hook";

type ShopCartState = ShopCartOrder & {
  referredCode?: string;
};

const initialState: { order: ShopCartState } = {
  order: {
    items: [],
    total: 0,
    referredCode: "",
  },
};

export type ShopCartStore = {
  currentBusinessId: string;
  byBusiness: Record<string, ShopCartState>;
  order: ShopCartState;
  add: (item: CompleteProduct) => void;
  setReferredCode: (code: string) => void;
  referredCode: () => string | undefined;
  numberOfItems: () => number;
  commission: () => number;
  inCart: (id: string) => boolean;
  items: () => ShopCartOrderItem[];
  hasItems: () => boolean;
  orderTotal: () => number;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setCustomPrice: (id: string, customPrice: number) => void;
  hasItemWithErrors: () => boolean;
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
      setReferredCode: (code: string) =>
        set((state) => {
          state.order.referredCode = code;
        }),
      referredCode: () => get().order.referredCode,
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
      setCustomPrice: (id: string, customPrice: number) =>
        set((state) => {
          state.order.items = setCustomPrice(state.order, id, customPrice);
        }),
      hasItemWithErrors: () => hasItemWithErrors(get().order),
    })),
    {
      name: "shopCart",
    },
  ),
);

export const useShopCart = createSelectors(_useShopCart);

export const useAddProductToCart = () => {
  const { sendEvent } = useGTMEvent();
  const _addProductToCart = useShopCart.use.add();
  const addProductToCart = (product: CompleteProduct) => {
    _addProductToCart(product);
    sendEvent({
      event: "add_to_cart",
      product,
    });
  };
  return addProductToCart;
};
