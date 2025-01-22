import { BusinessPlan } from "../prisma/generated/client";

export const INFINITE_NUMBER = -1;

export const NUMBER_OF_CATEGORY = "NUMBER_OF_CATEGORY";
export const CAN_CONFIGURE_SITE = "CAN_CONFIGURE_SITE";
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
    [NUMBER_OF_CATEGORY]: 2,
    [CAN_CONFIGURE_SITE]: false,
    [NUMBER_BUSINESS_USER]: 1,
  },
  [BusinessPlan.ENTERPRISE]: {
    [NUMBER_OF_CATEGORY]: INFINITE_NUMBER,
    [CAN_CONFIGURE_SITE]: true,
    [NUMBER_OF_PRODUCTS]: INFINITE_NUMBER,
    [NUMBER_OF_CARD_NUMBERS]: INFINITE_NUMBER,
    [NUMBER_BUSINESS_USER]: INFINITE_NUMBER,
  },
};
