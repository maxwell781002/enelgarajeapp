import { businessNeighborhoodRepository } from "../repositories/business-neighborhood";
import { neighborhoodRepository } from "../repositories/neighborhood";

export const businessShipping = async (businessId: string, city: string) => {
  const neighborhoods = await neighborhoodRepository.getByCity(city);
  const businessNeighborhoods =
    await businessNeighborhoodRepository.getByCityAndBusiness(businessId, city);
  return neighborhoods.map((neighborhood) => {
    const businessNeighborhood = businessNeighborhoods.find(
      (businessNeighborhood) =>
        businessNeighborhood.neighborhoodId === neighborhood.id,
    );
    return {
      ...neighborhood,
      shipping: businessNeighborhood ? businessNeighborhood.shipping : 0,
    };
  });
};
