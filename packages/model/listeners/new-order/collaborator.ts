import { formatDate } from "../../lib/date";
import { formatPrice } from "../../lib/utils";
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

export type TGetCollaboratorData = TGetCommonData &
  ReturnType<typeof getCollaboratorData>;

const getCollaboratorData = (order: CompleteOrder, host: string) => {
  const common = getCommonData(order, host);
  const ticket = order.ticket;
  const addressData = getAddressData(order);
  const customer = ticket?.customer;
  return {
    ...common,
    addressData,
    ticket,
    customer,
    commission: formatPrice(order.commission),
    deliveryDate: ticket?.deliveryDate && formatDate(ticket?.deliveryDate),
  };
};

export const generateCollaboratorTelegramMessage = (
  order: CompleteOrder,
  host: string,
) => {
  const message = getCollaboratorData(order, host);
  return generateTelegramText(message, host);
};

const generateTelegramText = (data: TGetCollaboratorData, host: string) => {
  const collaboratorWhatsapp = whatsappText(data.userData.phone as string);
  const customerWhatsapp =
    data.ticket?.phone && whatsappText(data.ticket?.phone as string);
  const products = getProductsText(data, host);
  const shippingText = hasShippingText(data);
  return `
🛒 *Nueva orden de un Gestor*

*Orden de compra*: ${data.identifier}

*Gestor*
*Nombre*: ${printText(data.userData.name)}
*Teléfono*: ${printText(data.userData.phone)}
${collaboratorWhatsapp}

*Cliente*
*Nombre*: ${printText(data.customer?.name)}
*Teléfono*: ${printText(data.ticket?.phone)}
${customerWhatsapp}
*CI*: ${printText(data.customer?.identification)}
${addressText(data.addressData)}
*Notas*: ${printText(data.ticket?.nota)}

*Productos*
${products}

${shippingText}
🎁 *Comisión*: ${data.commission}
*Fecha de entrega*: ${data.deliveryDate}
*Total*: ${data.total}

🔗[Ver más](${data.order_url})

🎉🎉🎉
`;
};

export const generateCollaboratorWhatsappMessage = (
  order: CompleteOrder,
  host: string,
) => {
  const message = getCollaboratorData(order, host);
  return generateWhatsappText(message, host);
};

const generateWhatsappText = (data: TGetCollaboratorData, host: string) => {
  const products = getProductsWithoutLinksText(data, host);
  const shippingText = hasShippingText(data);
  return `
🛒 *Nueva orden de un Gestor*

*Orden de compra*: ${data.identifier}

*Gestor*
*Nombre*: ${printText(data.userData.name)}
*Teléfono*: ${printText(data.userData.phone)}

*Cliente*
*Nombre*: ${printText(data.customer?.name)}
*Teléfono*: ${printText(data.ticket?.phone)}
*CI*: ${printText(data.customer?.identification)}
${addressText(data.addressData)}
*Notas*: ${printText(data.ticket?.nota)}

*Productos*
${products}

${shippingText}
🎁 *Comisión*: ${data.commission}
*Fecha de entrega*: ${data.deliveryDate}
*Total*: ${data.total}

🔗Ver más
${data.order_url}

🎉🎉🎉
`;
};
