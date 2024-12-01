import {
  UserBusinessType as BaseUserBusinessType,
  Currency as BaseCurrency,
} from "../prisma/generated/client";

export const UserBusinessType = BaseUserBusinessType;
export type TUserBusinessType = keyof typeof UserBusinessType;

export const Currency = BaseCurrency;
export type TCurrency = keyof typeof Currency;
