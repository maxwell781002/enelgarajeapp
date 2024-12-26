import { getNeighborhoodsByCityAndBusiness } from "@repo/model/api/neighborhood/callback";
import { getShippingPrice } from "@repo/model/lib/order";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
import { useEffect, useState, useTransition } from "react";

export const useCheckoutNeighborhood = (
  form: any,
  business: string,
  addressName: string,
  orderTotal: number,
) => {
  const city = form.watch(`${addressName}.city`);
  const neighborhoodId = form.watch(`${addressName}.neighborhoodId`);
  const wantDomicile = form.watch("wantDomicile");
  const [neighborhoodLoading, startNeighborhoodLoading] = useTransition();
  const [neighborhoods, setNeighborhoods] = useState<
    NeighborhoodWithShipping[]
  >([]);
  const currentNeighborhood = neighborhoods.find(
    (neighborhood) => neighborhood.id === neighborhoodId,
  );
  useEffect(() => {
    if (city && business) {
      startNeighborhoodLoading(async () => {
        form.resetField(`${addressName}.neighborhoodId`);
        const data = await getNeighborhoodsByCityAndBusiness(city, business);
        setNeighborhoods(data);
      });
    }
  }, [city, business]);
  const { total, shippingPrice } = getShippingPrice(
    orderTotal as number,
    currentNeighborhood?.shipping || 0,
    wantDomicile as boolean,
  );

  return {
    neighborhoods,
    shippingPrice,
    total,
    wantDomicile,
    neighborhoodLoading,
  };
};
