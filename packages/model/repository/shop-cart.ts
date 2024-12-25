import { CompleteOrderProduct } from "@repo/model/prisma/zod/orderproduct";
import { IProduct } from "@repo/model/types/product";

export type ShopCartOrderItem = Pick<
  CompleteOrderProduct,
  "price" | "quantity" | "product" | "productId" | "commission"
>;

export type ShopCartOrder = {
  items: ShopCartOrderItem[];
};

const addItemsFields = (items: ShopCartOrderItem[]) => {
  return items.map((item) => {
    return {
      ...item,
      commission: item.product._commission * item.quantity,
      price: item.product._price * item.quantity,
    };
  });
};

export const addProductToOrder = (order: ShopCartOrder, product: IProduct) => {
  let found = false;
  order.items = order.items.map((item) => {
    if (item.product.id === product.id) {
      found = true;
      const quantity = item.quantity + 1;
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });

  if (!found) {
    order.items.push({
      commission: product._commission,
      productId: product.id,
      price: product._price,
      product,
      quantity: 1,
    });
  }
  order.items = addItemsFields(order.items);
  return order;
};

export const setQuantity = (
  order: ShopCartOrder,
  productId: string,
  quantity: number,
) => {
  return addItemsFields(
    order.items.map((item: ShopCartOrderItem) => {
      if (item.productId === productId) {
        item.quantity = quantity;
      }
      return item;
    }),
  );
};

export const removeItem = (order: ShopCartOrder, productId: string) => {
  return order.items.filter(
    (item: ShopCartOrderItem) => item.productId !== productId,
  );
};

export const orderTotal = (order: ShopCartOrder) =>
  order.items.reduce((acc, item) => acc + item.price, 0);

export const orderCommission = (order: ShopCartOrder) =>
  order.items.reduce((acc, item) => acc + item.commission, 0);
