import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@repo/model/prisma/prisma-client";
import { businessRepository } from "@repo/model/repositories/business";
import { CompleteUser } from "../prisma/zod";
import { NextRequest } from "next/server";

export type SecurityUser = {
  businessIds: string[];
  businessCollaboratorIds: string[];
  businessMessengerIds: string[];
} & CompleteUser;

const adapter: any = PrismaAdapter(prisma());
const getUserByAccount = async (provider_providerAccountId: any) => {
  const user: SecurityUser = await adapter.getUserByAccount(
    provider_providerAccountId,
  );
  if (!user) return null;
  user.businessIds =
    (await businessRepository.getBusinessIdByUserOwner(user?.id)) || [];
  user.businessCollaboratorIds =
    (await businessRepository.getBusinessIdByUserCollaborator(user?.id)) || [];
  user.businessMessengerIds =
    (await businessRepository.getBusinessIdByUserMessenger(user?.id)) || [];
  return user;
};

const SESSION_COOKIE_NAME = `__Secure-next${process.env.AUTH_LOGIN_SESSION_COOKIE_PREFIX || ""}-auth.session-token`;

const config = {
  providers: [Google],
  adapter: { ...adapter, getUserByAccount },
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: SESSION_COOKIE_NAME,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      },
    },
  },
  callbacks: {
    async session({ session, token }: any) {
      return { ...session, user: token };
    },
    async jwt({ token, user }: any) {
      return {
        ...user,
        ...token,
      };
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth }: any = NextAuth(config);

const GLOBAL_PARAM_NAME = "globalRedirectAfterLogin";
const ORIGIN_HOST = "originHost";

export const redirectLogin = (session: any, request: NextRequest) => {
  const isLogin = request.nextUrl.pathname.includes("/login");
  const loginRedirect = new URL(process.env.AUTH_LOGIN_REDIRECT || "");
  const isGlobalLogin =
    request.headers.get("x-forwarded-host") === loginRedirect.host;
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
