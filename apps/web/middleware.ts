import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/model/lib/auth";

const locales = ["es"];
const defaultLocale = "es";
const securePages = ["/order"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export const runtime = "experimental-edge";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  if (
    !session &&
    securePages.find((page) => request.nextUrl.pathname.includes(page))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (session && request.nextUrl.pathname.includes("/auth/login")) {
    const url = request.nextUrl.searchParams.get("redirectAfterLogin") || "/";
    return NextResponse.redirect(new URL(url, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
