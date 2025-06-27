import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useBusinessContext } from "../context/business";
import { SecurityUser } from "@repo/model/lib/auth";
import { IProduct } from "@repo/model/types/product";
import { useStore } from "zustand";
import { useShopCart } from "../stores/shop-cart";
import { CompleteOrder } from "@repo/model/prisma/zod/order";

export type GTMEvent = {
  event: string;
  product?: IProduct;
  cartItems?: any;
  values?: Record<string, any>;
  order?: CompleteOrder;
};

const formatPrice = (amount: number) => {
  return (amount / 100).toFixed(2);
};

const addProduct = (product: IProduct, currency: string | undefined) => {
  return {
    item_id: product.id,
    item_sku: product.sku,
    item_name: product.name,
    price: formatPrice(product._price),
    outOfStock: product._outOfStock,
    commission: product._commission,
    businessProfit: product._businessProfit,
    quantity: product.stock,
    currency,
  };
};

export const useGTMEvent = (eventOnLoad: GTMEvent | null = null) => {
  const session = useSession();
  const businessContext = useBusinessContext();
  const user: SecurityUser | null = session?.data?.user;
  const referredCode = useStore(useShopCart, (state) => state.referredCode());
  const getGlobalData = () => {
    const globalData: Record<string, any> = {
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      },
      url: window?.location?.href,
      business: {
        subdomain: window?.location?.hostname,
        businessId: businessContext.business?.id,
      },
      isReferred: !!referredCode,
      referredCode,
    };
    return globalData;
  };
  const sendEvent = ({
    event,
    product,
    cartItems,
    values,
    order,
  }: GTMEvent) => {
    const globalData = getGlobalData();
    let items: any[] = [];
    const data: any = {
      event,
      ...globalData,
      ...values,
    };
    if (product) {
      items.push(
        addProduct(product, businessContext.business?.currency as string),
      );
    }
    if (cartItems) {
      items = [
        ...items,
        ...cartItems.map((item: any) =>
          addProduct(
            item.product,
            businessContext.business?.currency as string,
          ),
        ),
      ];
    }
    data.ecommerce = {
      items,
    };
    if (order) {
      data.orderData = order;
      data.ecommerce = {
        ...data.ecommerce,
        transaction_id: order.identifier,
        affiliation: businessContext.business?.name,
        value: formatPrice(order.total as number),
        shipping: formatPrice(order.shipping as number),
        currency: businessContext.business?.currency,
      };
    }
    console.log(data);
    // sendGTMEvent(data);
  };
  const calledOnce = useRef(false);
  useEffect(() => {
    if (!eventOnLoad) return;
    if (calledOnce.current) return;
    sendEvent(eventOnLoad);
    calledOnce.current = true;
  }, []);

  return {
    sendEvent,
  };
};
