import { paginateFrontend } from "@repo/model/repository/product";
import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/ui/lib/url";

export async function GET(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.businessId) return NextResponse.json({ message: "Error" });
  const data = await paginateFrontend(params);
  return NextResponse.json(data);
}
