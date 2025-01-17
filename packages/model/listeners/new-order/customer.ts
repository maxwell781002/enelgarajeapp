import { CompleteOrder } from "../../prisma/zod";
import {
  addressText,
  getAddressData,
  getCommonData,
  getProductsText,
  hasShippingText,
  printText,
  TGetCommonData,
  whatsappText,
} from "./common";

type TGenerateCustomerMessage = TGetCommonData & {
  addressData: ReturnType<typeof getAddressData>;
};

export const generateCustomerMessage = (order: CompleteOrder, host: string) => {
  const addressData = getAddressData(order);
  const common = getCommonData(order, host);
  const message = {
    ...common,
    addressData,
  };
  return generateText(message, host);
};

export const generateText = (data: TGenerateCustomerMessage, host: string) => {
  const whatsapp = whatsappText(data);
  const products = getProductsText(data, host);
  const shippingText = hasShippingText(data);
  return `
🛒 *Nueva orden*

*Orden de compra*: ${data.identifier}

*Cliente*: ${printText(data.userData.name)}
*Teléfono*: ${printText(data.userData.phone)}
${whatsapp}
${addressText(data.addressData)}

*Productos*
${products}

${shippingText}
*Total*: ${data.total}

🔗[Ver más](${data.order_url})

🎉🎉🎉
`;
};
