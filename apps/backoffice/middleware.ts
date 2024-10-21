import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/model/lib/auth";
import { UserRoles } from "@repo/model/repositories/user";

export const runtime = "experimental-edge";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  
  console.log('middleware', session?.user);
  if (session?.user?.role === UserRoles.USER) {
    
  }

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
