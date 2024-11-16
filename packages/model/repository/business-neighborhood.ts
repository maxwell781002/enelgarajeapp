import {
  CompleteBusinessNeighborhood,
  CompleteNeighborhood,
} from "../prisma/zod";
import { businessNeighborhoodRepository } from "../repositories/business-neighborhood";
import { neighborhoodRepository } from "../repositories/neighborhood";
import { NeighborhoodWithShipping } from "../types/neighborhood";

export const businessShipping = async (
  businessId: string,
  city: string,
): Promise<NeighborhoodWithShipping[]> => {
  const neighborhoods = await neighborhoodRepository.getByCity(city);
  const businessNeighborhoods =
    await businessNeighborhoodRepository.getByCityAndBusiness(businessId, city);
  return neighborhoods.map((neighborhood: CompleteNeighborhood) => {
    const businessNeighborhood = businessNeighborhoods.find(
      (businessNeighborhood: CompleteBusinessNeighborhood) =>
        businessNeighborhood.neighborhoodId === neighborhood.id,
    );
    return {
      ...neighborhood,
      shipping: businessNeighborhood ? businessNeighborhood.shipping : 0,
    };
  });
};

export const getBusinessShippingPrice = async (
  businessId: string,
  neighborhoodId: string,
) => {
  const neighborhood =
    await businessNeighborhoodRepository.getByBusinessIdAndNeighborhoodId(
      businessId,
      neighborhoodId,
    );
  return neighborhood?.shipping || 0;
};
