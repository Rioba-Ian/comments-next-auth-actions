import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export const authOptions: NextAuthOptions = {
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
