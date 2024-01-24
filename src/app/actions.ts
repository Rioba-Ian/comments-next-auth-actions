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

export async function upVoteScore(
 session: Session | null,
 commentId?: number,
 replyId?: number
) {
 if (!session?.user?.email) return null;

 if (commentId) {
  const comment = await prisma.comment.update({
   where: { id: commentId },
   data: {
    score: {
     increment: 1,
    },
   },
  });
  return comment;
 }

 if (replyId) {
  const reply = await prisma.reply.update({
   where: { id: replyId },
   data: {
    score: {
     increment: 1,
    },
   },
  });
  return reply;
 }
}

/*
const comment = await prisma.comment.update({
  where: { id },
  data: {
   score: {
    increment: 1,
   },
  },
 });

 return comment;
*/
