import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import seedDatabase from "@/lib/seed";
import { getComments } from "@/app/actions";

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

    const dataExists = await prisma.comment.findFirst();

    if (!newUser && user.id && !dataExists) {
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
