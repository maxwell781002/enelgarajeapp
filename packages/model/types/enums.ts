import {
  UserBusinessType as BaseUserBusinessType,
  Currency as BaseCurrency,
  CommissionType as BaseCommissionType,
  FormOfPaymentType as BaseFormOfPaymentType,
} from "../prisma/generated/client";

export const UserBusinessType = BaseUserBusinessType;
export type TUserBusinessType = keyof typeof UserBusinessType;

export const Currency = BaseCurrency;
export type TCurrency = keyof typeof Currency;

export const CommissionTypes = BaseCommissionType;
export type TCommissionType = keyof typeof CommissionTypes;

export const FormOfPaymentType = BaseFormOfPaymentType;
export type TFormOfPaymentType = keyof typeof FormOfPaymentType;
