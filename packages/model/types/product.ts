import { CompleteProduct } from "../prisma/zod/product";
import { TCommissionType } from "./enums.js";

export type IProduct = {
  _inCart: boolean;
  _isOffer: boolean;
  _outOfStock: boolean;
} & CompleteProduct;

export type ProductRegister = {
  productPrices: {
    hasCommission: boolean;
    commissionType: TCommissionType;
    commissionValue: number;
  };
} & Omit<
  CompleteProduct,
  "id" | "businessId" | "images" | "business" | "orderItems"
>;
