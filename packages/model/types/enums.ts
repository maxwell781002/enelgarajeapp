import {
  CommissionType as BaseCommissionType,
  Currency as BaseCurrency,
  FormOfPaymentType as BaseFormOfPaymentType,
  OrderStatus as BaseOrderStatus,
  PaymentGatewayType as BasePaymentGatewayType,
  UserBusinessType as BaseUserBusinessType,
  WhatsappConnectStatus as BaseWhatsappConnectStatus,
  PaymentGatewayOrderLogStatus as BasePaymentGatewayOrderLogStatus,
} from "../prisma/generated/client";

export const UserBusinessType = BaseUserBusinessType;
export type TUserBusinessType = keyof typeof UserBusinessType;

export const Currency = BaseCurrency;
export type TCurrency = keyof typeof Currency;

export const CommissionTypes = BaseCommissionType;
export type TCommissionType = keyof typeof CommissionTypes;

export const FormOfPaymentType = BaseFormOfPaymentType;
export type TFormOfPaymentType = keyof typeof FormOfPaymentType;

export const WhatsappConnectStatus = BaseWhatsappConnectStatus;
export type TWhatsappConnectStatus = keyof typeof WhatsappConnectStatus;

export const OrderStatus = BaseOrderStatus;
export type TOrderStatus = keyof typeof OrderStatus;

export const PaymentGatewayType = BasePaymentGatewayType;
export type TPaymentGatewayType = keyof typeof PaymentGatewayType;

export const PaymentGatewayOrderLogStatus = BasePaymentGatewayOrderLogStatus;
export type TPaymentGatewayOrderLogStatus =
  keyof typeof PaymentGatewayOrderLogStatus;
