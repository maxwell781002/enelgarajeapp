import { CompleteProduct } from "../prisma/zod/product";

export type IProduct = {
  _inCart: boolean;
  _isOffer: boolean;
  _outOfStock: boolean;
  _commission: number;
  _businessProfit: number;
  _price: number;
} & CompleteProduct;
