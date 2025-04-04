import { productRepository } from "@repo/model/repositories/product";
import { whatsappConnectRepository } from "@repo/model/repositories/whatsapp-connect";
import { getBusinessById } from "@repo/model/repository/business";
import {
  createInstance,
  getChatList as BaseGetChatList,
  getMessages,
  refreshChatList as baseRefreshChatList,
  removeInstance,
  removeMessagesBulk as baseRemoveMessagesBulk,
  retrieveCode,
  sendWhatsappMessagesBulk,
} from "../integrations/whatsapp";
import { CompleteProduct, CompleteWhatsappConnect } from "../prisma/zod";
import { formatPrice } from "@repo/model/lib/utils";
import {
  addProductFields,
  getCollaboratorProductUrl,
} from "@repo/model/repository/product";
import { businessRepository } from "@repo/model/repositories/business";
import {
  TMessageBulk,
  UpdateChatListProps,
  UpdateSecureCodeProps,
} from "@repo/model/types/whatsapp-connect";
import { getCurrentUser } from "./user";
import { WhatsappConnectStatus } from "../types/enums";

export const getChatList = async (businessId: string) => {
  const connect = await getWhatsappConnectByBusinessId(businessId);
  if (!connect) {
    throw new Error("Business not connected to whatsapp");
  }
  return BaseGetChatList(connect.phone);
};

export const refreshChatList = async (businessId: string) => {
  const connect = await getWhatsappConnectByBusinessId(businessId);
  if (!connect) {
    throw new Error("Business not connected to whatsapp");
  }
  await baseRefreshChatList(connect.phone, connect.id);
  await whatsappConnectRepository.updateChatList(connect.id, true);
};

export const updateChatListListener = async ({
  data: { id },
}: {
  data: UpdateChatListProps;
}) => {
  const entity = await whatsappConnectRepository.getById(id);
  if (entity) {
    return whatsappConnectRepository.updateChatList(entity.id, false);
  }
};

export const getWhatsappConnectByBusinessId = (businessId: string) => {
  return businessRepository.retrieveWhatsappConnect(businessId);
};

export const removeInstanceByBusinessId = async (businessId: string) => {
  const connect = await getWhatsappConnectByBusinessId(businessId);
  if (!connect) {
    return;
  }
  const count = await businessRepository.countByWhatsappConnect(connect.id);
  if (count > 1) {
    return businessRepository.disconnectWhatsapp(businessId);
  }
  await removeInstance(connect.phone);
  await businessRepository.disconnectWhatsapp(businessId);
  await whatsappConnectRepository.remove(connect.id);
};

export const updateSecureCode = ({
  id,
  secureCode,
  paringCode,
}: UpdateSecureCodeProps) => {
  return whatsappConnectRepository.updateSecureCode(id, secureCode, paringCode);
};

export const connectWhatsapp = async (businessId: string, phone: string) => {
  const business = await getBusinessById(businessId);
  const user = await getCurrentUser();
  if (!business.canConnectWhatsapp) {
    throw new Error("Business can't connect whatsapp");
  }
  if (business.whatsappConnect) {
    throw new Error("Business already connected to whatsapp");
  }
  let isNew = false;
  let entity = await whatsappConnectRepository.findByPhone(phone);
  if (entity && entity.ownerId !== user.id) {
    throw new Error("whatsapp_connected_to_other_user");
  }
  if (!entity) {
    entity = await whatsappConnectRepository.createWhatsappConnect(
      phone,
      user.id,
    );
    isNew = true;
  }
  await businessRepository.connectWhatsapp(businessId, entity.id);
  if (isNew) {
    await createInstance(
      {
        phone: entity.phone,
      },
      entity.id,
      entity.secureCode,
    );
  }
  return entity;
};

export const getProductMessageText = (_product: CompleteProduct) => {
  const product = addProductFields(_product);
  return `🛒 Producto: *${product.name}*
💵 Precio: *${formatPrice(product._price, product.business.currency)}*
💰 Comisión: *${formatPrice(product._commission, product.business.currency)}*
🛍️ En Stock: *${product.stock}*
🛒️ Fuera de Stock: *${product._outOfStock ? "Si" : "No"}*
${product.socialNetworksDescription || ""}
🔗 url: ${getCollaboratorProductUrl(product)}
`;
};

export const sendProducts = async (
  productsIds: string[],
  businessId: string,
  chatId: string,
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
  const messageBulk: TMessageBulk = {
    messages: products.map((product: CompleteProduct) => ({
      message: getProductMessageText({ ...product, business }),
      senderPhone: connect.phone,
      mediaUrl: (product.image as any)?.url,
      chatId,
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

export const disconnectWhatsapp = async ({ phone }: { phone: string }) => {
  const entity = await whatsappConnectRepository.findByPhone(phone);
  if (entity) {
    return whatsappConnectRepository.changeStatus(
      entity.id,
      WhatsappConnectStatus.DISCONNECTED,
    );
  }
};

export const authenticatedWhatsapp = async ({ phone }: { phone: string }) => {
  const entity = await whatsappConnectRepository.findByPhone(phone);
  if (entity) {
    return whatsappConnectRepository.changeStatus(
      entity.id,
      WhatsappConnectStatus.CONNECTED,
    );
  }
};
