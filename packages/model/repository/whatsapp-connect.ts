import { productRepository } from "../repositories/product";
import { whatsappConnectRepository } from "../repositories/whatsapp-connect";
import { getBusinessById } from "./business";
import {
  ChatType,
  sendWhatsappMessagesBulk,
  TMessageBulk,
} from "../integrations/whatsapp";
import { CompleteProduct, CompleteWhatsappConnect } from "../prisma/zod";
import { formatPrice } from "../lib/utils";
import { addProductFields } from "./product";
import { getCollaboratorProductUrl } from "./product";

export const getWhatsappConnectByBusinessId = (businessId: string) => {
  return whatsappConnectRepository.getByBusinessId(businessId);
};

export const updateByBusinessIdAndSecureCode = (
  businessId: string,
  secureCode: string,
  paringCode: string,
) => {
  return whatsappConnectRepository.updateByBusinessIdAndSecureCode(
    businessId,
    secureCode,
    paringCode,
  );
};

export const connectWhatsapp = async (businessId: string, phone: string) => {
  const business = await getBusinessById(businessId);
  if (!business.canConnectWhatsapp) {
    throw new Error("Business can't connect whatsapp");
  }
  const entity = await whatsappConnectRepository.createWhatsappConnect(
    businessId,
    phone,
  );
  const { WHATSAPP_WEBHOOK_RETURN, WHATSAPP_CREATE_INSTANCE_URL } = process.env;
  console.log(
    `${WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${entity.secureCode}`,
  );
  await fetch(WHATSAPP_CREATE_INSTANCE_URL as string, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
    },
    body: JSON.stringify({
      phone: entity.phone,
      webhook: `${WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${entity.secureCode}`,
    }),
  });
  return entity;
};

export const sendProducts = async (
  productsIds: string[],
  businessId: string,
  scheduledTime: string,
) => {
  const connect: CompleteWhatsappConnect =
    await getWhatsappConnectByBusinessId(businessId);
  if (!connect) {
    throw new Error("Business not connected to whatsapp");
  }
  const business = await getBusinessById(businessId);
  if (!business.canConnectWhatsapp) {
    throw new Error("Business can't connect whatsapp");
  }
  const products = await productRepository.getProductsByIds(
    productsIds,
    businessId,
  );
  const getMessage = (_product: CompleteProduct) => {
    const product = addProductFields(_product);
    return `🛒 Producto: *${product.name}*
💵 Precio: *${formatPrice(product._price, business.currency)}*
💰 Comisión: *${formatPrice(product._commission, business.currency)}*
🛍️ En Stock: *${product.stock}*
🛒️ Fuera de Stock: *${product._outOfStock ? "Si" : "No"}*
🔗 url: ${getCollaboratorProductUrl(product)}
`;
  };
  const messageBulk: TMessageBulk = {
    messages: products.map((product: CompleteProduct) => ({
      message: getMessage(product),
      senderPhone: connect.phone,
      mediaUrl: (product.image as any)?.url,
      chatId: process.env.BOT_WHATSAPP_TESTING_ID as string, // TODO: change to business whatsapp id
      chatType: ChatType.GROUP,
      previewLink: false,
    })),
    scheduledTime,
    externalId: businessId,
  };
  const response = await sendWhatsappMessagesBulk(messageBulk);
  console.log(await response.json());
};
