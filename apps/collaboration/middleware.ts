import { NextRequest, NextResponse } from "next/server";
import { auth, redirectLogin } from "@repo/model/lib/auth";

const NO_BUSINESS_PATHS = ["errors", "onboarding", "messenger"];

export const getRedirect = async (request: NextRequest, session: any) => {
  const globalLogin = redirectLogin(session, request);
  console.log("globalLogin", globalLogin);
  // if (globalLogin) {
  //   return globalLogin;
  // }
  let { pathname } = request.nextUrl;
  if (pathname === "/sentry-example-page") {
    return;
  }
  if (pathname.startsWith("/p")) {
    //Public page
    return;
  }
  const isLogin = pathname === "/login";
  if (!session && !isLogin) {
    return `/login?redirectAfterLogin=${pathname}`;
  }
  if (!session && isLogin) {
    return;
  }
  if (isLogin) {
    return request.nextUrl.searchParams.get("redirectAfterLogin") || "/";
  }
  const user = session.user;
  const firstPart = pathname.split("/")[1];
  const businessIds = [
    ...(user.businessCollaboratorIds || []),
    ...(user.businessMessengerIds || []),
  ];
  if (
    firstPart === "onboarding" &&
    businessIds.includes(pathname.split("/")[2])
  ) {
    return `/${pathname.split("/")[2]}`;
  }
  if (NO_BUSINESS_PATHS.includes(firstPart as string)) {
    return;
  }
  // The user is messenger.
  if (user.businessMessengerIds?.length) {
    return "/messenger";
  }
  if (pathname === "/" && businessIds.length > 0) {
    return `/${businessIds[0]}`;
  }
  if (!businessIds.includes(firstPart)) {
    return "/errors/403";
  }
};

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const url = (await getRedirect(request, session)) as unknown as string;
  console.log("URL", url);
  return url
    ? NextResponse.redirect(new URL(url, request.url))
    : NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|monitoring).*)",
  ],
};
