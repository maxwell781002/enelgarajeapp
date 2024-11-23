import { BusinessPlan } from "../prisma/generated/client";

export const INFINITE_NUMBER = -1;

export const CAN_CREATE_CATEGORY = "CAN_CREATE_CATEGORY";
export const NUMBER_BUSINESS_USER = "NUMBER_BUSINESS_USER";
export const NUMBER_OF_PRODUCTS = "NUMBER_OF_PRODUCTS";
export const NUMBER_OF_CARD_NUMBERS = "NUMBER_OF_CARD_NUMBERS";

export type TFeatureKey =
  | keyof (typeof PLANS)["BASIC"]
  | keyof (typeof PLANS)["ENTERPRISE"];

export const PLANS = {
  [BusinessPlan.BASIC]: {
    [NUMBER_OF_PRODUCTS]: 10,
    [NUMBER_OF_CARD_NUMBERS]: 1,
    [CAN_CREATE_CATEGORY]: false,
    [NUMBER_BUSINESS_USER]: 0,
  },
  [BusinessPlan.ENTERPRISE]: {
    [CAN_CREATE_CATEGORY]: true,
    [NUMBER_OF_PRODUCTS]: INFINITE_NUMBER,
    [NUMBER_OF_CARD_NUMBERS]: INFINITE_NUMBER,
    [NUMBER_BUSINESS_USER]: INFINITE_NUMBER,
  },
};
