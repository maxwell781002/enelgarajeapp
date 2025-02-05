import { CompleteOrder } from "../../prisma/zod";
import {
  addressText,
  getAddressData,
  getCommonData,
  getProductsText,
  getProductsWithoutLinksText,
  hasShippingText,
  printText,
  TGetCommonData,
  whatsappText,
} from "./common";

type TGenerateCustomerMessage = TGetCommonData & {
  addressData: ReturnType<typeof getAddressData>;
};

const generateReferredMessage = (order: TGenerateCustomerMessage) => {
  if (!order.referredBy) {
    return "";
  }
  return `
👷‍♀️ *Referido por*: ${order.referredBy}`;
};

export const generateCustomerTelegramMessage = (
  order: CompleteOrder,
  host: string,
) => {
  const addressData = getAddressData(order);
  const common = getCommonData(order, host);
  const message = {
    ...common,
    addressData,
  };
  return generateTelegramText(message, host);
};

const generateTelegramText = (data: TGenerateCustomerMessage, host: string) => {
  const whatsapp = whatsappText(data.userData.phone as string);
  const products = getProductsText(data, host);
  const shippingText = hasShippingText(data);
  const referredMessage = generateReferredMessage(data);
  return `
🛒 *Nueva orden*

*Orden de compra*: ${data.identifier}

*Cliente*: ${printText(data.userData.name)}
*Teléfono*: ${printText(data.userData.phone)}
${whatsapp}
${addressText(data.addressData)}
${referredMessage}

*Productos*
${products}

${shippingText}
*Total*: ${data.total}

🔗[Ver más](${data.order_url})

🎉🎉🎉
`;
};

export const generateCustomerWhatsappMessage = (
  order: CompleteOrder,
  host: string,
) => {
  const addressData = getAddressData(order);
  const common = getCommonData(order, host);
  const message = {
    ...common,
    addressData,
  };
  return generateWhatsappText(message, host);
};

const generateWhatsappText = (data: TGenerateCustomerMessage, host: string) => {
  const products = getProductsWithoutLinksText(data, host);
  const shippingText = hasShippingText(data);
  const referredMessage = generateReferredMessage(data);
  return `
🛒 *Nueva orden*

*Orden de compra*: ${data.identifier}

*Cliente*: ${printText(data.userData.name)}
*Teléfono*: ${printText(data.userData.phone)}
${addressText(data.addressData)}
${referredMessage}

*Productos*
${products}

${shippingText}
*Total*: ${data.total}

🔗 Ver más
${data.order_url}

🎉🎉🎉
`;
};
