export const formatPrice = (
  amount: number,
  showAcronym = true,
  currency: string = "$",
  acronym = "CUP",
) => {
  const price = `${currency}${(amount / 100).toFixed(2)}`;
  return showAcronym ? `${price} ${acronym}` : price;
};

export const normalizePhone = (phone: string | null | undefined) => {
  if (phone?.length === 8) {
    return `+53${phone}`;
  }
  return phone;
};
