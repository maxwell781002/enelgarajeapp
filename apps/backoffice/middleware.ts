import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/model/lib/auth";
import { UserRoles } from "@repo/model/repositories/user";

export const runtime = "experimental-edge";

export const getRedirect = async (request: NextRequest, session: any) => {
  let { pathname } = request.nextUrl;
  const isLogin = pathname === "/login";
  if (!session && !isLogin) {
    return "/login";
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
    pathname === "/" &&
    user.role === UserRoles.USER &&
    businessIds.length > 0
  ) {
    return `/${user.businessIds[0]}`;
  }
  const parts = pathname.split("/");
  if (user.role === UserRoles.USER && !user.businessIds.includes(parts[1])) {
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
