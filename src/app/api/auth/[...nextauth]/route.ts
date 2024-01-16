import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import { env } from "@/lib/env";

export const authOptions = {
 adapter: PrismaAdapter(prisma) as Adapter,
 providers: [
  GithubProvider({
   clientId: env.GITHUB_CLIENT_ID,
   clientSecret: env.GITHUB_CLIENT_SECRET,
  }),
  GoogleProvider({
   clientId: env.GOOGLE_CLIENT_ID,
   clientSecret: env.GOOGLE_CLIENT_SECRET,
  }),
 ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
