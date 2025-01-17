import {
  AddressType,
  CollaboratorShoppingCartSchema,
  TCartItem,
  TCollaboratorShoppingCartSchema,
  TShoppingCartSchemaRegister,
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
  CompleteOrder,
  CompleteProduct,
  CompleteUser,
} from "../prisma/zod";
import { userRepository } from "../repositories/user";
import { addAddressToUser } from "./address";
import { sendOrderToTelegram } from "../listeners/new-order/index";
import { OrderSend } from "../lib/event-emitter/events";
import { transaction } from "../prisma/prisma-client";
import { calculateOrderProductCommissionAndPrice } from "./shop-cart";
import { createCustomer } from "./customer";
import { createCollaboratorTicket } from "./collaborator-ticket";

const isOutOfStock = (product: CompleteProduct, quantity: number): boolean =>
  !product.allowOrderOutOfStock &&
  product.isExhaustible &&
  product.stock < quantity;

const calculateProductCommission = (
  isCollaborator: boolean,
  product: ReturnType<typeof addProductFields>,
  quantity: number,
  customPrice: number = 0,
): [number, number, number] => {
  if (customPrice > 0 && customPrice <= product._price) {
    throw new BadRequestError("error_price_custom");
  }
  const [commission, price] = calculateOrderProductCommissionAndPrice(
    product._price,
    product._commission,
    quantity,
    customPrice,
  );
  return [
    isCollaborator ? commission : 0,
    isCollaborator ? product._businessProfit * quantity : 0,
    price,
  ];
};

export const orderItems = async (
  businessId: string,
  items: TCartItem[],
  isCollaborator: boolean,
) => {
  const byIds = items.reduce<any>((acc, item) => {
    acc[item.productId] = {
      quantity: item.quantity,
      customPrice: item.customPrice,
    };
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
    ) => {
      const product = addProductFields(item);
      const { quantity, customPrice } = byIds[product.id];
      const [itemCommission, itemBusinessProfit, price] =
        calculateProductCommission(
          isCollaborator,
          product,
          quantity,
          customPrice,
        );
      const orderItem = {
        price,
        quantity,
        customPrice,
        position: 0,
        productId: product.id,
        commission: itemCommission,
        businessProfit: itemBusinessProfit,
      };
      return {
        items: [...items, orderItem],
        products: [...products, product],
        productToUpdate: [...productToUpdate, [product, quantity]],
        total: total + price,
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
  const { id, ...restAddress } = address;
  order.orderAddress = {
    create: {
      address: { create: restAddress },
    },
  };
  return { ...order };
};

export const createCollaboratorOrder = async (
  business: CompleteBusiness,
  user: CompleteUser,
  data: TCollaboratorShoppingCartSchema,
) => {
  CollaboratorShoppingCartSchema.parse(data);
  const { customer, ticket, ...rest } = data;
  const entity = await transaction(async () => {
    const order = await createOrder(business, user, rest, true);
    const customerEntity = await createCustomer(customer, business.id);
    await createCollaboratorTicket(
      ticket,
      business.id,
      customerEntity.id,
      order.id,
      user.id,
      customer.phone,
    );
    return order;
  });
  //TODO: When I configure the listener send the event instance of
  // eventEmitter.dispatch(new OrderSend(newOrder as CompleteOrder));
  await sendOrderToTelegram(new OrderSend(entity as CompleteOrder));
  return entity;
};

export const createWebOrder = async (
  business: CompleteBusiness,
  user: CompleteUser,
  data: TWebShoppingCartSchema,
) => {
  WebShoppingCartSchema.parse(data);
  let { phone, name, addressType, ...rest } = data;
  const address = rest[addressType as AddressType];
  const entity = await transaction(async () => {
    await userRepository.update(user.id, { ...user, phone, name });
    if (addressType === AddressType.newAddress && rest.wantDomicile) {
      await addAddressToUser(user.id, business.id, address);
    }
    return createOrder(business, user, { ...rest, address }, false);
  });
  //TODO: When I configure the listener send the event instance of
  // eventEmitter.dispatch(new OrderSend(newOrder as CompleteOrder));
  await sendOrderToTelegram(new OrderSend(entity as CompleteOrder));
  return entity;
};

export const createOrder = async (
  business: CompleteBusiness,
  user: CompleteUser,
  data: TShoppingCartSchemaRegister,
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
  const entity = await orderRepository.createOrder(order, business, items);
  return entity;
};
