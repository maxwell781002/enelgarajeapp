import {
  AddressType,
  CollaboratorShoppingCartSchema,
  TCartItem,
  TCollaboratorShoppingCartSchema,
  TWebShoppingCartSchema,
  WebShoppingCartSchema,
} from "@repo/model/validation/user";
import { productRepository } from "@repo/model/repositories/product";
import { addProductFields } from "./product";
import { getShippingPrice } from "../lib/order";
import { BadRequestError } from "../errors/bad-request";
import { getBusinessShippingPrice } from "./business-neighborhood";
import { orderRepository } from "../repositories/order";
import {
  CompleteAddress,
  CompleteBusiness,
  CompleteProduct,
  CompleteUser,
} from "../prisma/zod";
import { userRepository } from "../repositories/user";
import { addAddressToUser } from "./address";

const isOutOfStock = (product: CompleteProduct, quantity: number): boolean =>
  !product.allowOrderOutOfStock &&
  product.isExhaustible &&
  product.stock < quantity;

const calculateProductCommission = (
  isCollaborator: boolean,
  product: ReturnType<typeof addProductFields>,
  quantity: number,
): [number, number] => [
  isCollaborator ? product._commission * quantity : 0,
  isCollaborator ? product._businessProfit * quantity : 0,
];

export const orderItems = async (
  businessId: string,
  items: TCartItem[],
  isCollaborator: boolean,
) => {
  const byIds = items.reduce<any>((acc, item) => {
    acc[item.productId] = item.quantity;
    return acc;
  }, {});
  const products = await productRepository.getByBusinessAndIds(
    Object.keys(byIds),
    businessId,
  );
  return products.reduce(
    (
      {
        total,
        commission,
        businessProfit,
        hasProductOutOfStock,
        items,
        products,
        productToUpdate,
      }: any,
      item: any,
      index: number,
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
        items: [...items, orderItem],
        products: [...products, product],
        productToUpdate: [...productToUpdate, [product, quantity]],
        total: total + product._price * quantity,
        commission: commission + itemCommission,
        businessProfit: businessProfit + itemBusinessProfit,
        hasProductOutOfStock:
          hasProductOutOfStock || isOutOfStock(product, quantity),
      };
    },
    {
      items: [],
      products: [],
      productToUpdate: [],
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
  if (!wantDomicile) {
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

export const createCollaboratorOrder = (
  business: CompleteBusiness,
  user: CompleteUser,
  data: TCollaboratorShoppingCartSchema,
) => {
  CollaboratorShoppingCartSchema.parse(data);
  return createOrder(business, user, data, true);
};

export const createWebOrder = async (
  business: CompleteBusiness,
  user: CompleteUser,
  data: TWebShoppingCartSchema,
) => {
  WebShoppingCartSchema.parse(data);
  let { phone, name, addressType, ...rest } = data;
  const address = rest[addressType];
  await userRepository.update(user.id, { ...user, phone, name });
  if (addressType === AddressType.newAddress) {
    await addAddressToUser(user.id, business.id, address);
  }
  return createOrder(business, user, { ...rest, address }, false);
};

export const createOrder = async (
  business: CompleteBusiness,
  user: CompleteUser,
  data: TCollaboratorShoppingCartSchema,
  isCollaborator: boolean,
) => {
  const {
    items,
    products,
    total,
    commission,
    businessProfit,
    hasProductOutOfStock,
    productToUpdate,
  } = await orderItems(business.id, data.cartItems, isCollaborator);
  if (hasProductOutOfStock) {
    throw new BadRequestError("out_of_stock");
  }
  let order: any = {
    total,
    commission,
    businessProfit,
    userId: user.id,
    productsDetails: products,
    isCollaborator,
  };
  order = await addShipping(
    order,
    data.address as CompleteAddress,
    business,
    total,
    !!data.wantDomicile,
  );
  await productRepository.updateStock(productToUpdate);
  return orderRepository.createOrder(order, business, items);
};
