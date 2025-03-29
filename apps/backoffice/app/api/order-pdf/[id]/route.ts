import { getCurrentUser } from "@repo/model/repository/user";
import { getOrderSecurity } from "@repo/model/repository/order";
import { NextRequest } from "next/server";
import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { getAddressData } from "@repo/ui/components/order-page/address-data";
import { CompleteUser } from "@repo/model/zod/user";
import { formatPrice } from "@repo/model/lib/utils";
import { formatDate } from "@repo/model/lib/date";

const getOrderData = async (
  order: CompleteOrder,
  t: (key: string) => string,
) => {
  const data = {
    logo: { value: "/logo.png" },
    business: { value: order.business?.name ?? "" },
    identifier: { value: order.identifier ?? "" },
    createdAt: { label: t("createdAt"), value: formatDate(order.createdAt) },
    products: {
      label: t("cardProducts"),
      columnsHeader: [t("product"), t("quantity"), t("price")],
      items: order.items.map((item) => ({
        product: item.product.name,
        quantity: item.quantity,
        price: formatPrice(item.price, order.currency),
      })),
    },
    footer: {
      total: {
        label: t("total"),
        value: formatPrice(order.total, order.currency),
      },
      items: [
        {
          label: t("commission"),
          value: formatPrice(order.commission, order.currency),
        },
        {
          label: t("shipping"),
          value: formatPrice(order.shipping, order.currency),
        },
      ],
    },
  };
  return data;
};

const getCollaboratorData = async (
  order: CompleteOrder,
  t: (key: string) => string,
) => {
  const ticket = order.ticket;
  const user = order.user as CompleteUser;
  const addressItems = await getAddressData(order);
  const data = await getOrderData(order, t);
  const result: any = {
    ...data,
    sentAt: {
      label: t("deliveryDate"),
      value: formatDate(ticket?.deliveryDate ?? new Date()),
    },
    referredBy: {
      label: t("cardCollaborator"),
      value: [
        { label: t("collaboratorName"), value: user.name },
        { label: t("phone"), value: user.phone },
      ],
    },
    customer: {
      label: t("cardCustomer"),
      value: [
        { label: t("customerName"), value: ticket?.customer?.name },
        { label: t("identification"), value: ticket?.customer?.identification },
        { label: t("phone"), value: ticket?.phone },
        ...addressItems,
      ],
    },
    paymentMethod: {
      label: t("cardPayment"),
      value: [
        {
          label: t("currency"),
          value: ticket?.currency,
        },
        {
          label: t("formOfPayment"),
          value: ticket?.formOfPayment && t(ticket?.formOfPayment),
        },
      ],
    },
  };
  if (ticket?.nota) {
    result.nota = {
      label: t("cardNota"),
      value: ticket?.nota,
    };
  }
  return result;
};

const getClientData = async (
  order: CompleteOrder,
  t: (key: string) => string,
) => {
  const data: any = await getOrderData(order, t);
  const referredBy = order.referredBy;
  if (referredBy) {
    data.referredBy = {
      label: t("cardReferredBy"),
      value: [
        { label: t("collaboratorName"), value: referredBy.name },
        { label: t("phone"), value: referredBy.phone },
      ],
    };
  }
  const addressItems = await getAddressData(order);
  const user = order.user as CompleteUser;
  return {
    ...data,
    customer: {
      label: t("cardCustomer"),
      value: [
        { label: t("customerName"), value: user.name },
        { label: t("phone"), value: user.phone },
        ...addressItems,
      ],
    },
  };
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser();
  const { id } = params;
  const order = (await getOrderSecurity(id, user)) as CompleteOrder;
  if (!order) {
    return new Response("Not found", { status: 404 });
  }
  const t = await getTranslations("OrderDetailBack");
  const data = order.isCollaborator
    ? await getCollaboratorData(order, t)
    : await getClientData(order, t);
  const url = `${process.env.PDF_GENERATOR_URL}/api/generate/invoice`;
  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const blob = await response.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `attachment; filename="order-${order.identifier}.pdf"`,
    },
  });
}
