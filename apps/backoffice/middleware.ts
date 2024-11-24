import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/model/lib/auth";
import { UserRoles } from "@repo/model/repositories/user";

export const runtime = "experimental-edge";

const NO_BUSINESS_PATHS = ["errors", "request-shop"];

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
    pathname = "/";
  }
  const user = session.user;
  if (pathname === "/admin" && user.role !== UserRoles.ADMIN) {
    return "/errors/403";
  }
  if (pathname === "/" && user.role === UserRoles.ADMIN) {
    return "/admin/dashboard";
  }
  const businessIds = user.businessIds || [];
  if (
    pathname === "/" &&
    user.role === UserRoles.USER &&
    businessIds.length === 0
  ) {
    return "/request-shop";
  }
  if (
    (pathname === "/" || pathname === "/request-shop") &&
    user.role === UserRoles.USER &&
    businessIds.length > 0
  ) {
    return `/${user.businessIds[0]}`;
  }
  const firstPart = pathname.split("/")[1];
  if (NO_BUSINESS_PATHS.includes(firstPart as string)) {
    return;
  }
  if (user.role === UserRoles.USER && !businessIds.includes(firstPart)) {
    return "/errors/403";
  }
};

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const url = await getRedirect(request, session);
  return url
    ? NextResponse.redirect(new URL(url, request.url))
    : NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
