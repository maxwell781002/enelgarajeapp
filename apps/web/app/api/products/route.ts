import { paginateFrontend } from "@repo/model/repository/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const businessId = req.nextUrl.searchParams.get("businessId");
  if (!businessId) return NextResponse.json({ message: "Error" });
  const params: any = {
    businessId,
    pageIndex: req.nextUrl.searchParams.get("page") || 1,
  };
  const categoryId = req.nextUrl.searchParams.get("categoryId");
  if (categoryId) params["categoryId"] = categoryId;
  const data = await paginateFrontend(params);
  return NextResponse.json(data);
}
