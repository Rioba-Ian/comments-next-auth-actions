import { prisma } from "@/lib/db/prisma";
import { Session } from "next-auth";

export async function getComments(session: Session | null) {
 if (!session?.user?.email) return null;

 const comments = await prisma.comment.findMany({
  include: {
   replies: true,
  },
 });

 return comments;
}

export async function getUsers(session: Session | null) {
 if (!session?.user?.email) return null;

 const users = await prisma.user.findMany({
  select: {
   id: true,
   email: true,
   name: true,
   image: true,
  },
 });

 return users;
}
