import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/model/lib/auth";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const isLogin = request.nextUrl.pathname === "/login";
  if (!session && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (session && isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
