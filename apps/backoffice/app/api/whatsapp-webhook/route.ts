import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/model/lib/url";
import { updateByBusinessIdAndSecureCode } from "@repo/model/repository/whatsapp-connect";

export async function POST(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.businessId)
    return NextResponse.json({ message: "businessId required" });
  if (!params.secureCode)
    return NextResponse.json({ message: "secureCode required" });
  const { code } = await req.json();
  const entity = await updateByBusinessIdAndSecureCode(
    params.businessId,
    params.secureCode,
    code,
  );
  return NextResponse.json({ message: entity ? "Success" : "NotFound" });
}
