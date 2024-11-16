import { ShopCartOrder } from "@repo/model/types/shop-cart";

export const calculateShippingPrice = (
  order: ShopCartOrder,
  neighborhoodShippingPrice: number,
  wantDomicile: boolean,
) => {
  const shippingPrice = wantDomicile ? neighborhoodShippingPrice || 0 : 0;
  const total = wantDomicile ? order.total + shippingPrice : order.total;
  return {
    shippingPrice,
    subtotal: order.total,
    total,
  };
};
