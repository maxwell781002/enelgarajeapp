import {
  UserBusinessType as BaseUserBusinessType,
  Currency as BaseCurrency,
  CommissionType as BaseCommissionType,
} from "../prisma/generated/client";

export const UserBusinessType = BaseUserBusinessType;
export type TUserBusinessType = keyof typeof UserBusinessType;

export const Currency = BaseCurrency;
export type TCurrency = keyof typeof Currency;

export const CommissionTypes = BaseCommissionType;
export type TCommissionType = keyof typeof CommissionTypes;
