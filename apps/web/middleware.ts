import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { auth, redirectLogin } from "@repo/model/lib/auth";

const locales = ["es"];
const defaultLocale = "es";
const securePages = ["/order"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const globalLogin = redirectLogin(session, request);
  if (globalLogin) {
    console.log("globalLogin", globalLogin);
    return NextResponse.redirect(new URL(globalLogin, request.url));
  }
  if (
    !session &&
    securePages.find((page) => request.nextUrl.pathname.includes(page))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|monitoring).*)",
  ],
};
