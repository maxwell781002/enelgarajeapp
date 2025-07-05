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

const config = {
  providers: [Google],
  adapter: { ...adapter, getUserByAccount },
  session: { strategy: "jwt" },
  //--
  cookies: {
    sessionToken: 
    {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: process.env.NEXT_PUBLIC_DOMAIN,
      }
    },
  },
  //--
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

export const redirectLogin = (session: any, request: NextRequest) => {
  const isLogin = request.nextUrl.pathname.includes("/login");
  const loginRedirect = new URL(process.env.AUTH_LOGIN_REDIRECT || "");
  const isGlobalLogin =
    request.headers.get("x-forwarded-host") === loginRedirect.host ||
    request.nextUrl.searchParams.has(GLOBAL_PARAM_NAME);
  console.log(
    isLogin,
    isGlobalLogin,
    request.headers.get("x-forwarded-host"),
    loginRedirect.host,
    request.nextUrl.host,
    request,
    session,
  );
  if (!session && isLogin && !isGlobalLogin) {
    const href = Buffer.from(request.nextUrl.href).toString("base64");
    return `${loginRedirect.href}?${GLOBAL_PARAM_NAME}=${href}`;
  }
  const url = request.nextUrl.searchParams.get(GLOBAL_PARAM_NAME);
  if (session && isGlobalLogin && url) {
    return Buffer.from(url || "", "base64").toString("utf-8");
  }
};
