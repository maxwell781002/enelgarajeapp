import { CompleteOrder } from "@repo/model/zod/order";
import { create } from "zustand";

type Store = {
  ordersToPay: CompleteOrder[];
  addOrder: (order: CompleteOrder) => void;
  removeOrder: (orderId: string) => void;
  isOrderInList: (orderId: string) => boolean;
  addOrRemoveOrder: (order: CompleteOrder) => void;
  totalToPay: () => number;
};

export const useStore = create<Store>((set, get) => ({
  ordersToPay: [],
  addOrder: (order: CompleteOrder) =>
    set((state) => {
      let orderToPay = state.ordersToPay;
      if (state.ordersToPay.some((o) => o.id === order.id)) {
        orderToPay = [...orderToPay, order];
      }
      return { ordersToPay: [...orderToPay] };
    }),
  removeOrder: (orderId: string) =>
    set((state) => ({
      ordersToPay: state.ordersToPay.filter((o) => o.id !== orderId),
    })),
  isOrderInList: (orderId: string) =>
    get().ordersToPay.some((o) => o.id === orderId),
  addOrRemoveOrder: (order: CompleteOrder) =>
    set((state) => {
      if (state.ordersToPay.some((o) => o.id === order.id)) {
        return {
          ordersToPay: state.ordersToPay.filter((o) => o.id !== order.id),
        };
      }
      return { ordersToPay: [...state.ordersToPay, order] };
    }),
  totalToPay: () => get().ordersToPay.reduce((acc, o) => acc + o.total, 0),
}));
