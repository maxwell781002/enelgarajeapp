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
