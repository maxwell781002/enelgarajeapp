import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/model/lib/auth";

export const runtime = "experimental-edge";

const NO_BUSINESS_PATHS = ["errors", "onboarding"];

export const getRedirect = async (request: NextRequest, session: any) => {
  let { pathname } = request.nextUrl;
  const isLogin = pathname === "/login";
  if (!session && !isLogin) {
    return "/login";
  }
  if (!session && isLogin) {
    return;
  }
  if (isLogin) {
    return "/";
  }
  const user = session.user;
  const firstPart = pathname.split("/")[1];
  if (NO_BUSINESS_PATHS.includes(firstPart as string)) {
    return;
  }
  const businessIds = user.businessCollaboratorIds || [];
  if (!businessIds.includes(firstPart)) {
    return "/errors/403";
  }
};

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const url = (await getRedirect(request, session)) as unknown as string;
  return url
    ? NextResponse.redirect(new URL(url, request.url))
    : NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
