import { productRepository } from "@repo/model/repositories/product";
import { whatsappConnectRepository } from "@repo/model/repositories/whatsapp-connect";
import { getBusinessById } from "@repo/model/repository/business";
import {
  createInstance,
  removeInstance,
  retrieveCode,
  getMessages,
  sendWhatsappMessagesBulk,
  removeMessagesBulk as baseRemoveMessagesBulk,
} from "../integrations/whatsapp";
import { CompleteProduct, CompleteWhatsappConnect } from "../prisma/zod";
import { formatPrice } from "@repo/model/lib/utils";
import { addProductFields } from "@repo/model/repository/product";
import { getCollaboratorProductUrl } from "@repo/model/repository/product";
import { businessRepository } from "@repo/model/repositories/business";
import { ChatType, TMessageBulk } from "@repo/model/types/whatsapp-connect";

export const getWhatsappConnectByBusinessId = (businessId: string) => {
  return businessRepository.retrieveWhatsappConnect(businessId);
};

export const removeInstanceByBusinessId = async (businessId: string) => {
  const connect = await getWhatsappConnectByBusinessId(businessId);
  if (!connect) {
    throw new Error("Business not connected to whatsapp");
  }
  const count = await businessRepository.countByWhatsappConnect(connect.id);
  if (count > 1) {
    return businessRepository.disconnectWhatsapp(businessId);
  }
  await removeInstance(connect.phone);
  await businessRepository.disconnectWhatsapp(businessId);
  return whatsappConnectRepository.remove(connect.id);
};

export const updateSecureCode = (
  id: string,
  secureCode: string,
  paringCode: string,
) => {
  return whatsappConnectRepository.updateSecureCode(id, secureCode, paringCode);
};

export const connectWhatsapp = async (businessId: string, phone: string) => {
  const business = await getBusinessById(businessId);
  if (!business.canConnectWhatsapp) {
    throw new Error("Business can't connect whatsapp");
  }
  if (business.whatsappConnect) {
    throw new Error("Business already connected to whatsapp");
  }
  let isNew = false;
  let entity = await whatsappConnectRepository.findByPhone(phone);
  if (!entity) {
    entity = await whatsappConnectRepository.createWhatsappConnect(phone);
    isNew = true;
  }
  await businessRepository.connectWhatsapp(businessId, entity.id);
  if (isNew) {
    await createInstance(
      {
        phone: entity.phone,
      },
      businessId,
      entity.secureCode,
    );
  }
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

export const retrieveCodeByBusinessId = async (businessId: string) => {
  const business = await getBusinessById(businessId);
  if (!business.canConnectWhatsapp) {
    throw new Error("Business can't connect whatsapp");
  }
  const whatsappConnect = await getWhatsappConnectByBusinessId(businessId);
  if (!whatsappConnect) {
    throw new Error("Business already connected to whatsapp");
  }
  const { code } = await retrieveCode({
    phone: whatsappConnect.phone,
  });
  return whatsappConnectRepository.updateCode(whatsappConnect.id, code);
};

export const getMessagesBulk = async (
  businessId: string,
  lastEvaluatedKey: string | null = null,
) => {
  return getMessages(businessId, lastEvaluatedKey);
};

export const removeMessagesBulk = async (scheduledTime: string) => {
  const response = await baseRemoveMessagesBulk(scheduledTime);
  return response.status === 200;
};
