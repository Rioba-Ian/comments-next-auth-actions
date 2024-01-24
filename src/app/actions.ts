"use server";
import { prisma } from "@/lib/db/prisma";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

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

type CommentOrReplyProps = {
 commentId?: number;
 replyId?: number;
};

export async function upVoteScore(
 session: Session | null,
 { commentId, replyId }: CommentOrReplyProps
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

  console.log("comment", comment);
  console.log("commentId", commentId);

  if (comment) {
   revalidatePath("/");
  }
  return comment;
 } else if (replyId) {
  const reply = await prisma.reply.update({
   where: { id: replyId },
   data: {
    score: {
     increment: 1,
    },
   },
  });

  console.log("reply", reply);
  console.log("replyId", replyId);

  if (reply) {
   revalidatePath("/");
  }
  return reply;
 }
}
