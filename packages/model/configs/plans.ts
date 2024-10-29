import { BusinessPlan } from "../prisma/generated/client";

export const INFINITE_NUMBER = -1;

export const CAN_CREATE_CATEGORY = "CAN_CREATE_CATEGORY";
export const NUMBER_OF_PRODUCTS = "NUMBER_OF_PRODUCTS";

export type TFeatureKey =
  | keyof (typeof PLANS)["BASIC"]
  | keyof (typeof PLANS)["ENTERPRISE"];

export const PLANS = {
  [BusinessPlan.BASIC]: {
    [NUMBER_OF_PRODUCTS]: 10,
    [CAN_CREATE_CATEGORY]: false,
  },
  [BusinessPlan.ENTERPRISE]: {
    [CAN_CREATE_CATEGORY]: true,
    [NUMBER_OF_PRODUCTS]: INFINITE_NUMBER,
  },
};
