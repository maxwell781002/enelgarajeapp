import { ShopCartOrder } from "@repo/model/types/shop-cart";

export const calculateShippingPrice = (
  order: ShopCartOrder,
  neighborhoodShippingPrice: number,
  wantDomicile: boolean,
) => {
  const shipping = neighborhoodShippingPrice || 0;
  const shippingPrice = wantDomicile ? shipping : 0;
  const total = wantDomicile ? order.total + shippingPrice : order.total;
  return {
    shippingPrice,
    subtotal: order.total,
    hasShipping: !!shipping,
    total,
  };
};
