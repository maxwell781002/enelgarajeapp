import { CompleteProduct, CompleteOrderProduct } from "../prisma/zod";

export type ShopCartOrderItem = Pick<
  CompleteOrderProduct,
  "price" | "quantity" | "product"
>;

export type ShopCartOrder = {
  items: ShopCartOrderItem[];
};

const price = (product: CompleteProduct) => product.offerPrice || product.price;

export const addProductToOrder = (
  order: ShopCartOrder,
  product: CompleteProduct,
) => {
  let found = false;
  order.items = order.items.map((item) => {
    if (item.product.id === product.id) {
      found = true;
      const quantity = item.quantity + 1;
      return {
        ...item,
        quantity,
        price: item.price * (item.quantity + 1),
      };
    }
    return item;
  });
  if (!found) {
    order.items.push({
      price: price(product),
      product,
      quantity: 1,
    });
  }
  return order;
};
