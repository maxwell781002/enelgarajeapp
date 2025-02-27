import { CompleteProduct } from "@repo/model/zod/product";
import { create } from "zustand";

type Store = {
  productList: CompleteProduct[];
  totalProducts: () => number;
  isProductInList: (product: CompleteProduct) => boolean;
  addOrRemove: (product: CompleteProduct) => void;
  clear: () => void;
};

export const useStore = create<Store>((set, get) => ({
  productList: [],
  clear: () => set(() => ({ productList: [] })),
  totalProducts: () => get().productList.length,
  isProductInList: (product: CompleteProduct) =>
    !!get().productList.find((item) => item.id === product.id),
  addOrRemove: (product: CompleteProduct) =>
    set((state) => {
      let products = state.productList;
      if (products.some((o) => o.id === product.id)) {
        products = products.filter((o) => o.id !== product.id);
      } else {
        products = [...products, product];
      }
      return {
        productList: products,
      };
    }),
}));
