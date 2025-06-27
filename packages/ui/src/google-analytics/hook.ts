import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useBusinessContext } from "../context/business";
import { SecurityUser } from "@repo/model/lib/auth";
import { IProduct } from "@repo/model/types/product";

export type GTMEvent = {
  event: string;
  product?: IProduct;
  values?: Record<string, any>;
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
  const globalData: Record<string, any> = {
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    },
    url: window.location.href,
    business: {
      subdomain: window.location.hostname,
      businessId: businessContext.business?.id,
    },
  };
  const sendEvent = ({ event, product, values }: GTMEvent) => {
    const data: any = {
      event,
      ...globalData,
      ...values,
      items: [],
    };
    const productData = addProduct(
      product,
      businessContext.business?.currency as string,
    );
    if (productData) {
      data.items.push(productData);
    }
    console.log(data);
    // sendGTMEvent(data);
  };
  useEffect(() => {
    if (!eventOnLoad) return;
    sendEvent(eventOnLoad);
  }, [eventOnLoad]);

  return {
    sendEvent,
  };
};
