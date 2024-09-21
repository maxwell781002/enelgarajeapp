import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@repo/model/prisma/prisma-client";

const config = {
  providers: [Google],
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth }: any = NextAuth(config);
