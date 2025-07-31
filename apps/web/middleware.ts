import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/model/lib/auth";
import {
  isDomainToRedirect,
  redirectLogin,
} from "@repo/model/lib/redirect-login";

const locales = ["es"];
const defaultLocale = "es";
const securePages = ["/order"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default async function middleware(request: NextRequest) {
  const currentHost = request.headers.get("x-forwarded-host") || "";
  const session = await auth();
  const globalLogin = redirectLogin(session, request);
  console.log(
    "middleware",
    session,
    currentHost,
    isDomainToRedirect(currentHost),
    process.env.NEXT_PUBLIC_DOMAIN,
    process.env.AUTH_LOGIN_SESSION_COOKIE_PREFIX,
  );
  if (globalLogin && isDomainToRedirect(currentHost)) {
    console.log("globalLogin", globalLogin);
    return NextResponse.redirect(new URL(globalLogin, request.url));
  }
  if (
    !session &&
    securePages.find((page) => request.nextUrl.pathname.includes(page))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    !isDomainToRedirect(currentHost) &&
    session &&
    request.nextUrl.pathname.includes("/auth/login")
  ) {
    const url = request.nextUrl.searchParams.get("redirectAfterLogin") || "/";
    return NextResponse.redirect(new URL(url, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|monitoring).*)",
  ],
};
