import { ShopCartOrder } from "@repo/model/types/shop-cart";

//TODO see if I can remove this
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

export const getShippingPrice = (
  orderTotal: number,
  neighborhoodShippingPrice: number,
  wantDomicile: boolean,
) => {
  const shipping = neighborhoodShippingPrice || 0;
  const shippingPrice = wantDomicile ? shipping : 0;
  const total = wantDomicile ? orderTotal + shippingPrice : orderTotal;
  return {
    shippingPrice,
    total,
  };
};
