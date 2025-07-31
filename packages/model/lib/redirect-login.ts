import { NextRequest } from "next/server";

const GLOBAL_PARAM_NAME = "globalRedirectAfterLogin";
const ORIGIN_HOST = "originHost";
const DOMAINS_TO_REDIRECT = [".enelgaraje.com"];

export const isDomainToRedirect = (domain: string | null | undefined) => {
  return (
    domain &&
    DOMAINS_TO_REDIRECT.some((domainToRedirect) =>
      new RegExp(domainToRedirect).test(domain),
    )
  );
};

export const redirectLogin = (session: any, request: NextRequest) => {
  const currentHost = request.headers.get("x-forwarded-host");
  const isLogin = request.nextUrl.pathname.includes("/login");
  const loginRedirect = new URL(process.env.AUTH_LOGIN_REDIRECT || "");
  const isGlobalLogin = currentHost === loginRedirect.host;
  if (!session && isLogin && !isGlobalLogin) {
    const searchParams = Object.fromEntries(
      request.nextUrl.searchParams.entries(),
    );
    searchParams[ORIGIN_HOST] = request.nextUrl.origin;
    const oauthUrl = new URL(loginRedirect.href);
    oauthUrl.searchParams.set(GLOBAL_PARAM_NAME, JSON.stringify(searchParams));
    return oauthUrl.href;
  }
  const globalData = request.nextUrl.searchParams.get(GLOBAL_PARAM_NAME);
  if (session && isGlobalLogin && globalData) {
    const { [ORIGIN_HOST]: originHost, redirectAfterLogin } = JSON.parse(
      globalData || "",
    );
    const url = new URL(`${originHost}/auth/complete-login`);
    if (redirectAfterLogin) {
      url.searchParams.set("redirectAfterLogin", redirectAfterLogin);
    }
    return url.href;
  }
};
