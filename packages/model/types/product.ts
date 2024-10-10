import { CompleteProduct } from "../prisma/zod/product";

export type IProduct = {
  _inCart: boolean;
  _isOffer: boolean;
} & CompleteProduct;
