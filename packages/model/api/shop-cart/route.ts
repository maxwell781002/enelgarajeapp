import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/model/lib/url";
import { orderItems } from "../../repository/checkout";
import { BadRequestError } from "../../errors/bad-request";

export async function POST(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.businessId || !params.isCollaborator) {
    return NextResponse.json({ message: "Error" });
  }
  const body = await req.json();
  const isCollaborator = params.isCollaborator === "true";
  try {
    const { hasProductOutOfStock } = await orderItems(
      params.businessId,
      body,
      isCollaborator,
    );
    return NextResponse.json({ hasProductOutOfStock });
  } catch (error: any) {
    if (error.name === BadRequestError.name) {
      return NextResponse.json({ message: error.message });
    }
    throw error;
  }
}
