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

type CommentId = {
 commentId: number;
};

type ReplyId = {
 replyId: number;
};

type CommentOrReplyProps = CommentId | ReplyId;

export async function upVoteScore(
 session: Session | null,
 props: CommentOrReplyProps
) {
 if (!session?.user?.email) return null;

 if ("commentId" in props) {
  const { commentId } = props;

  console.log(commentId);

  const comment = await prisma.comment.update({
   where: { id: Number(commentId) },
   data: {
    score: {
     increment: 1,
    },
   },
  });

  if (comment) {
   revalidatePath("/");
  }
 } else if ("replyId" in props) {
  const { replyId } = props;
  const reply = await prisma.reply.update({
   where: { id: replyId },
   data: {
    score: {
     increment: 1,
    },
   },
  });

  if (reply) {
   revalidatePath("/");
  }
  return reply;
 }
}
