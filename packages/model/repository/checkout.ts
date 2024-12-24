import {
  TCartItem,
  TCollaboratorShoppingCartSchema,
} from "@repo/model/validation/user";
import { productRepository } from "@repo/model/repositories/product";
import { addProductFields } from "./product";
import { getShippingPrice } from "../lib/order";
import { BadRequestError } from "../errors/bad-request";
import { getBusinessShippingPrice } from "./business-neighborhood";
import { orderRepository } from "../repositories/order";
import { CompleteAddress, CompleteBusiness, CompleteUser } from "../prisma/zod";

const isOutOfStock = (product, quantity) =>
  !product.allowOrderOutOfStock &&
  product.isExhaustible &&
  product.stock < quantity;

const calculateProductCommission = (
  isCollaborator: boolean,
  product: ReturnType<typeof addProductFields>,
  quantity: number,
) => [
  isCollaborator ? product._commission * quantity : 0,
  isCollaborator ? product._businessProfit * quantity : 0,
];
export const orderItems = async (
  businessId: string,
  items: TCartItem[],
  isCollaborator: boolean,
) => {
  const byIds = items.reduce((acc, item) => {
    acc[item.productId] = item.quantity;
    return acc;
  }, {});
  const products = await productRepository.getByBusinessAndIds(
    Object.keys(byIds),
    businessId,
  );
  return products.reduce(
    (
      { total, commission, businessProfit, hasProductOutOfStock, items },
      item,
      index,
    ) => {
      const product = addProductFields(item);
      const quantity = byIds[product.id];
      const [itemCommission, itemBusinessProfit] = calculateProductCommission(
        isCollaborator,
        product,
        quantity,
      );
      const orderItem = {
        quantity,
        position: index + 1,
        productId: product.id,
        price: product._price * quantity,
        commission: itemCommission,
        businessProfit: itemBusinessProfit,
      };
      return {
        items: [...items, { orderItem, product }],
        total: total + product._price * quantity,
        commission: commission + itemCommission,
        businessProfit: businessProfit + itemBusinessProfit,
        hasProductOutOfStock:
          hasProductOutOfStock || isOutOfStock(product, quantity),
      };
    },
    {
      items: [],
      total: 0,
      commission: 0,
      businessProfit: 0,
      hasProductOutOfStock: false,
    },
  );
};

const addShipping = async (
  order: any,
  address: CompleteAddress,
  business: CompleteBusiness,
  total: number,
  wantDomicile: boolean,
) => {
  if (!address) {
    return order;
  }
  const neighborhoodId = address.neighborhoodId;
  const neighborhoodShipping = await getBusinessShippingPrice(
    business.id,
    neighborhoodId as string,
  );
  const shipping = await getShippingPrice(
    total,
    neighborhoodShipping,
    wantDomicile,
  );
  order.hasShipping = !!shipping.shippingPrice;
  order.total = shipping.total;
  order.shipping = shipping.shippingPrice;
  order.orderAddress = {
    create: {
      address: { create: address },
    },
  };
  return { ...order };
};

export const createCollaboratorOrder = async (
  business: CompleteBusiness,
  user: CompleteUser,
  data: TCollaboratorShoppingCartSchema,
) => {
  const { items, total, commission, businessProfit, hasProductOutOfStock } =
    await orderItems(business.id, data.cartItems, true);
  const productsDetails = items.map((item) => item.product);
  const productItems = items.map((item) => item.orderItem);
  if (hasProductOutOfStock) {
    throw new BadRequestError("out_of_stock");
  }
  let order: any = {
    total,
    commission,
    businessProfit,
    userId: user.id,
    productsDetails,
    isCollaborator: true,
  };
  order = await addShipping(
    order,
    data.address as CompleteAddress,
    business,
    total,
    !!data.wantDomicile,
  );
  return orderRepository.createOrder(order, business, productItems);
};
