import { getCityByCode, getStateByCode } from "../../lib/locations";
import { formatPrice, normalizePhone } from "../../lib/utils";
import {
  CompleteOrder,
  CompleteOrderProduct,
  CompleteProduct,
} from "../../prisma/zod";

export type TGetCommonData = ReturnType<typeof getCommonData>;

export const printText = (data: any) => (data ? data : "");

export const hasShippingText = (data: TGetCommonData) =>
  `🚚 ${
    data.shipping > 0
      ? `✅ Pagó el envío ${data.formatShipping}`
      : "❌ No pagó el envío"
  }`;

export const addressText = (data: ReturnType<typeof getAddressData>) => {
  return !data ? "" : `*Dirección*
${printText(data.address)}
${printText(data.neighborhood)}
${printText(data.city)}, ${printText(data.state)}
${printText(data.reference)}`;
};

export const whatsappText = (phone: string) => {
  const message_whatsapp = "Hola%20ha%20comprado%20en%20nuestra%20tienda";
  return `*Whatsapp*
📱[Aplicación](https://api.whatsapp.com/send/?phone=${phone}&text=${message_whatsapp}) 🌐[web](https://web.whatsapp.com/send?phone=${phone}&text=${message_whatsapp})`;
};

export const getProductsText = (data: TGetCommonData, host: string) => {
  const productUrl = (item: CompleteProduct) =>
    `${host}/${data.businessId}/products/${item.id}`;
  return data.items
    .map(
      (item: any) =>
        `👉 [${item.name}](${
          productUrl(
            item,
          )
        }) \n Precio: ${item.price} \n Cantidad: ${item.quantity} \n Precio tienda: ${item.originalPrice} \n Precio gestor: ${item.customPrice}`,
    )
    .join("\n");
};

export const getProductsWithoutLinksText = (
  data: TGetCommonData,
  host: string,
) => {
  return data.items
    .map(
      (item: any) =>
        `👉 ${item.name} \n Precio: ${item.price} \n Cantidad: ${item.quantity} \n Precio tienda: ${item.originalPrice} \n Precio gestor: ${item.customPrice}`,
    )
    .join("\n");
};

export const getAddressData = (order: CompleteOrder) => {
  const address = order.orderAddress?.address;
  return (
    address && {
      address: address.address,
      neighborhood: address.neighborhood?.name,
      city: getCityByCode(address.city)?.name,
      state: getStateByCode(address.state)?.name,
      reference: address.reference,
    }
  );
};

export const getCommonData = (order: CompleteOrder, host: string) => {
  const user = order.user;
  return {
    order_url: `${host}/${order.businessId}/orders/${order.id}`,
    businessId: order.businessId,
    identifier: order.identifier,
    shipping: order.shipping,
    formatShipping: formatPrice(order.shipping, order.currency),
    userData: {
      id: user?.id,
      name: user?.name,
      phone: normalizePhone(user?.phone),
    },
    referredBy: order.referredBy?.name,
    items: order.items.map((item: CompleteOrderProduct) => ({
      id: item.product.id, //TODO this field should be named productId
      name: item.product.name,
      price: formatPrice(item.price, order.currency),
      originalPrice: formatPrice(item.originalPrice, order.currency),
      customPrice: item.customPrice
        ? formatPrice(item.customPrice, order.currency)
        : formatPrice(item.originalPrice, order.currency),
      quantity: item.quantity,
    })),
    total: formatPrice(order.total, order.currency),
  };
};
