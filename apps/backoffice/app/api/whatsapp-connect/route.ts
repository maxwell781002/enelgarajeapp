import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/model/lib/url";
import { getWhatsappConnectByBusinessId } from "@repo/model/repository/whatsapp-connect";

export async function GET(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.businessId) return NextResponse.json({ message: "Error" });
  const data = await getWhatsappConnectByBusinessId(params.businessId);
  return NextResponse.json(data);
}
