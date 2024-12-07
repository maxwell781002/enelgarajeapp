import { Currency, TCurrency } from "../types/enums";
import { CommissionTypes } from "../types/enums.js";

export type FormatPriceOptions = {
  showAcronym?: boolean;
  symbol?: string;
};

export const formatPrice = (
  amount: number,
  currency: TCurrency | string = "",
  options: FormatPriceOptions = {
    showAcronym: true,
    symbol: "$",
  },
) => {
  const price = `${options.symbol}${(amount / 100).toFixed(2)}`;
  return options.showAcronym ? `${price} ${currency}` : price;
};

export const normalizePhone = (phone: string | null | undefined) => {
  if (phone?.length === 8) {
    return `+53${phone}`;
  }
  return phone;
};

export const isFile = (value: any) =>
  Object.prototype.toString.call(value) === "[object File]";

export function formDataToObject(formData: FormData) {
  const computeObject = (data: any, parts: string[], value: any): any => {
    const field = parts.shift() as string;
    if (parts.length === 0) {
      const valueData = isFile(value) ? value : JSON.parse(value);
      return { [field]: valueData };
    }
    const currentData = data[field] || {};
    const newValue = computeObject(currentData, parts, value);
    return {
      [field]: { ...newValue, ...currentData },
    };
  };
  return Object.entries(Object.fromEntries(formData.entries())).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...computeObject(acc, key.split("."), value),
    }),
    {},
  );
}

export const commissionCalculate = (
  basePrice: number,
  commissionType: string,
  commission: number,
) => {
  let value = 0;
  if (commissionType === CommissionTypes.PERCENTAGE) {
    value = basePrice === 0 ? 0 : (basePrice * commission) / 100;
  } else if (commissionType === CommissionTypes.FIXED) {
    value = commission;
  }
  return [value, basePrice - value];
};
