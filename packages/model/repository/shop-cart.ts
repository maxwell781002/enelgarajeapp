import { CompleteOrderProduct } from "@repo/model/prisma/zod/orderproduct";
import { IProduct } from "@repo/model/types/product";

export type ShopCartOrderItem = { product: IProduct; errors: string[] } & Pick<
  CompleteOrderProduct,
  "price" | "quantity" | "productId" | "commission" | "customPrice"
>;

export type ShopCartOrder = {
  items: ShopCartOrderItem[];
  total: number;
};

const calculateOrderProductCommissionAndPrice = (
  basePrice: number,
  commission: number,
  quantity: number,
  customPrice: number,
  hasError: boolean = false,
): [number, number] => {
  commission *= quantity;
  let price = basePrice * quantity;
  const byCustomPrice = customPrice * quantity;
  if (!hasError && price < byCustomPrice) {
    commission += byCustomPrice - price;
    price = byCustomPrice;
  }
  return [commission, price];
};

const addItemsFields = (items: ShopCartOrderItem[]) => {
  return items.map((item) => {
    const [commission, price] = calculateOrderProductCommissionAndPrice(
      item.product._price,
      item.product._commission,
      item.quantity,
      item.customPrice,
      !!item.errors.length,
    );
    return {
      ...item,
      commission,
      price,
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
      customPrice: 0,
      errors: [],
    });
  }
  order.items = addItemsFields(order.items);
  return order;
};

export const setCustomPrice = (
  order: ShopCartOrder,
  productId: string,
  price: number,
) => {
  return addItemsFields(
    order.items.map((item) => {
      if (item.productId === productId) {
        const error = "error_price_custom";
        item.customPrice = price;
        if (
          price !== 0 &&
          price <= item.product._price &&
          !item.errors.includes(error)
        ) {
          item.errors.push(error);
        }
        if (price > item.product._price || price === 0) {
          item.errors = item.errors.filter((error) => error !== error);
        }
      }
      return item;
    }),
  );
};

export const hasItemWithErrors = (order: ShopCartOrder) =>
  order.items.some((item) => item.errors?.length > 0);

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
