import { getCurrentUser } from "@repo/model/repository/user";
import { getOrderSecurity } from "@repo/model/repository/order";
import { NextRequest } from "next/server";
import { getTranslations } from "next-intl/server";
import { SecurityUser } from "@repo/model/lib/auth";

const getTemplateId = (user: SecurityUser, businessId: string) => {
  if (user?.businessIds.includes(businessId)) {
    return "business-owner";
  }
  if (user?.businessCollaboratorIds.includes(businessId)) {
    return "business-collaborator";
  }
  return "user";
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser();
  const { id } = params;
  const order = await getOrderSecurity(id, user);
  if (!order) {
    return new Response("Not found", { status: 404 });
  }
  const t = await getTranslations("Invoice");
  const url = process.env.PDF_GENERATOR_URL as string;
  const templateName = getTemplateId(user, order.businessId ?? "");
  console.log("templateName", templateName);
  const response = await fetch(`${url}/api/generate`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Pepe",
      invoice: {
        label: t("title"),
        value: "some value",
      },
    }),
  });
  const blob = await response.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": `attachment; filename="order-aa.pdf"`,
    },
  });
}
