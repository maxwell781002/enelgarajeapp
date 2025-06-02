import {
  CommissionTypes,
  Currency,
  FormOfPaymentType,
  TCurrency,
  TFormOfPaymentType,
} from "@repo/model/types/enums";

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
  return options.showAcronym ? `${price} ${currency as string}` : price;
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
    const numerator = basePrice * commission;
    value = numerator === 0 ? numerator : numerator / 100;
  } else if (commissionType === CommissionTypes.FIXED) {
    value = commission;
  }
  return [value, basePrice - value];
};

export const transfermovilText = (cardNumber: string, phone: string) =>
  `TRANSFERMOVIL_ETECSA,TRANSFERENCIA,${cardNumber},${phone},`;

export const generateCode = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isValidFormOfPaymentType = (
  paymentType: TFormOfPaymentType,
  currency: TCurrency,
) => {
  const options: Record<TFormOfPaymentType, TCurrency[]> = {
    [FormOfPaymentType.TRANSFER]: [Currency.CUP, Currency.USD, Currency.MLC],
    [FormOfPaymentType.CASH]: [Currency.CUP, Currency.USD],
  };
  return options[paymentType].includes(currency);
};

export const skuGenerator = (
  prefix: string,
  position: number,
  pad: number = 5,
) => {
  return `${prefix}-${position.toString().padStart(pad, "0")}`;
};
