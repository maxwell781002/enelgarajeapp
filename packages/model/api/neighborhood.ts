export const getNeighborhoodsByCityAndBusiness = async (
  city: string,
  business: string,
) => {
  const response = await fetch(
    `/api/neighborhood?city=${city}&businessId=${business}`,
  );
  return await response.json();
};
