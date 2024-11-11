import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/ui/lib/url";
import { neighborhoodRepository } from "@repo/model/repositories/neighborhood";

export async function GET(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.city) return NextResponse.json({ message: "Error" });
  const data = await neighborhoodRepository.getByCity(params.city);
  return NextResponse.json(data);
}
