import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@repo/model/prisma/prisma-client";
import { businessRepository } from "@repo/model/repositories/business";

const adapter: any = PrismaAdapter(prisma());
const getUserByAccount = async (provider_providerAccountId: any) => {
  const user = await adapter.getUserByAccount(provider_providerAccountId);
  if (!user) return null;
  user.businessIds = await businessRepository.getBusinessIdByUserOwner(
    user?.id,
  );
  user.businessCollaboratorIds =
    await businessRepository.getBusinessIdByUserCollaborator(user?.id);
  return user;
};

const config = {
  providers: [Google],
  adapter: { ...adapter, getUserByAccount },
  session: { strategy: "jwt" },
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
