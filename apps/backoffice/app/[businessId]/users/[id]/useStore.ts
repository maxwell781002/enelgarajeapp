import { CompleteOrder } from "@repo/model/zod/order";
import { create } from "zustand";
import { TCurrency } from "@repo/model/types/enums";

type TTotalToPay = Record<TCurrency, number | undefined>;
type TOrderToPay = {
  [key in TCurrency]?: CompleteOrder[];
};

type Store = {
  ordersToPay: TOrderToPay;
  isOrderInList: (order: CompleteOrder) => boolean;
  addOrRemoveOrder: (order: CompleteOrder) => void;
  clearOrdersByCurrency: (currency: TCurrency) => void;
};

export const totalToPayByCurrency = (ordersToPay: TOrderToPay) =>
  Object.entries(ordersToPay).reduce((acc: any, [key, value]) => {
    acc[key] = value.reduce((total, order) => total + order.total, 0);
    return acc;
  }, {} as TTotalToPay);

export const ordersIdByCurrency = (
  ordersToPay: TOrderToPay,
  currency: TCurrency,
) => ordersToPay[currency]?.map((order) => order.id) || [];

export const useStore = create<Store>((set, get) => ({
  ordersToPay: {},
  isOrderInList: (order: CompleteOrder) =>
    !!get().ordersToPay[order.currency]?.some((o) => o.id === order.id),
  addOrRemoveOrder: (order: CompleteOrder) =>
    set((state) => {
      let orderToPay = state.ordersToPay[order.currency] || [];
      if (orderToPay.some((o) => o.id === order.id)) {
        orderToPay = orderToPay.filter((o) => o.id !== order.id);
      } else {
        orderToPay = [...orderToPay, order];
      }
      return {
        ordersToPay: { ...state.ordersToPay, [order.currency]: orderToPay },
      };
    }),
  clearOrdersByCurrency: (currency: TCurrency) =>
    set((state) => ({
      ordersToPay: { ...state.ordersToPay, [currency]: [] },
    })),
}));
