import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/model/lib/url";
import { orderItems } from "../../repository/checkout";

export async function POST(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.businessId || !params.isCollaborator) {
    return NextResponse.json({ message: "Error" });
  }
  const body = await req.json();
  const isCollaborator = params.isCollaborator === "true";
  try {
    const { hasProductOutOfStock, hasProductInactive } = await orderItems(
      params.businessId,
      body,
      isCollaborator,
    );
    return NextResponse.json({ hasProductOutOfStock, hasProductInactive });
  } catch (error: any) {
    if (error.message === "error_price_custom") {
      return NextResponse.json({ message: error.message });
    }
    throw error;
  }
}
