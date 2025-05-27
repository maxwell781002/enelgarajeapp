import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/model/lib/url";
import { invitationLinkRepository } from "@repo/model/repositories/invitation-link";

export async function POST(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.businessId) return NextResponse.json({ message: "Error" });
  const body = await req.json();
  const { code, ...data } = await invitationLinkRepository.createNewLink(
    params.businessId,
    body.type,
  );
  return NextResponse.json({
    link: `${process.env.COLLABORATOR_ONBOARDING_URL}/${code}`,
    ...data,
  });
}
