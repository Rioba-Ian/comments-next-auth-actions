import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import seedDatabase from "@/lib/seed";

export const authOptions: NextAuthOptions = {
 adapter: PrismaAdapter(prisma) as Adapter,
 providers: [
  GoogleProvider({
   clientId: env.GOOGLE_CLIENT_ID,
   clientSecret: env.GOOGLE_CLIENT_SECRET,
  }),
 ],
 callbacks: {
  async signIn({ user }) {
   if (user.email !== null && user.email !== undefined) {
    const newUser = await prisma.user.findUnique({
     where: {
      email: user.email,
     },
    });

    if (!newUser && user.id) {
     await seedDatabase(Number(user.id))
      .then(() => {
       console.log(`Seeded database for ${user.email}`);
      })
      .catch((error) => {
       console.log(error);
      });
    }

    return true;
   } else {
    return false;
   }
  },
 },
};
