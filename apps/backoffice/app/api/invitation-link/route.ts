import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@repo/ui/lib/url";
import { invitationLinkRepository } from "@repo/model/repositories/invitation-link";

export async function POST(req: NextRequest) {
  const params: any = getSearchParams(req.nextUrl.searchParams);
  if (!params.businessId) return NextResponse.json({ message: "Error" });
  const { code, ...data } = await invitationLinkRepository.createNewLink(
    params.businessId,
  );
  return NextResponse.json({
    link: `${process.env.COLLABORATOR_ONBOARDING_URL}/${code}`,
    ...data,
  });
}
