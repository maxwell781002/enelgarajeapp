import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/ui/lib/url";
import { businessShipping } from "@repo/model/repository/business-neighborhood";

export async function GET(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.city || !params.businessId) {
    return NextResponse.json({ message: "Error" });
  }
  const data = await businessShipping(params.businessId, params.city);
  return NextResponse.json(data);
}
