"use server";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { Session, getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getComments(session: Session | null) {
 const comments = await prisma.comment.findMany({
  include: {
   replies: true,
  },
 });

 return comments;
}

export async function getUsers() {
 const users = await prisma.user.findMany({
  select: {
   id: true,
   email: true,
   name: true,
   image: true,
   emailVerified: true,
  },
 });

 return users;
}

export async function getUser(session: Session | null) {
 if (!session?.user?.email) return null;

 const user = await prisma.user.findUnique({
  where: { email: session.user.email },
  select: {
   id: true,
   email: true,
   name: true,
   image: true,
   emailVerified: true,
  },
 });

 return user;
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

export async function downVoteScore(
 session: Session | null,
 props: CommentOrReplyProps
) {
 if (!session?.user?.email) return null;

 if ("commentId" in props) {
  const { commentId } = props;

  const comment = await prisma.comment.update({
   where: { id: commentId },
   data: {
    score: {
     decrement: 1,
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
     decrement: 1,
    },
   },
  });

  if (reply) {
   revalidatePath("/");
  }

  return reply;
 }
}

export async function sendComment(userId: number, formData: FormData) {
 if (!userId) {
  throw Error("User not found");
 }

 const message = formData.get("content") as string;

 if (!message) {
  throw Error("Content is required");
 } else {
  await prisma.comment.create({
   data: {
    content: message,
    userId: userId,
   },
  });
 }

 revalidatePath("/");
}

export async function sendReply(
 userId: number,
 formData: FormData,
 commentId: number
) {
 if (!userId) {
  throw Error("User not found");
 }

 const message = formData.get("content") as string;

 if (!message) {
  throw Error("Message content is required.");
 }

 // handle reply of a comment first
 const commentBelongsToId = await prisma.comment.findUnique({
  where: {
   id: commentId,
  },
 });

 console.log(commentBelongsToId);

 if (commentBelongsToId) {
  await prisma.reply.create({
   data: {
    content: message,
    commentId: commentBelongsToId.id,
    userId: userId,
   },
  });
 }

 // handle reply of a reply
 const replyOfReplyBelongsToComment = await prisma.reply.findUnique({
  where: {
   id: commentId,
  },
 });

 console.log(replyOfReplyBelongsToComment);

 if (replyOfReplyBelongsToComment) {
  await prisma.reply.create({
   data: {
    content: message,
    commentId: replyOfReplyBelongsToComment.commentId,
    userId: userId,
   },
  });
 }

 revalidatePath("/");
}

export async function deleteComment(id: number) {
 console.log("running");

 console.log(id);

 const comment = await prisma.comment.findUnique({
  where: {
   id: id,
  },
 });

 console.log(comment);

 if (!comment) {
  throw new Error("Comment not found.");
 }

 const res = await prisma.comment.delete({
  where: {
   id: id,
  },
  include: {
   replies: true,
  },
 });

 revalidatePath("/");
}

export async function deleteReply(id: number) {
 console.log("running");

 console.log(id);

 const reply = await prisma.reply.findUnique({
  where: {
   id: id,
  },
 });

 if (!reply) {
  throw new Error("The reply was not found.");
 }

 const res = await prisma.reply.delete({
  where: {
   id: id,
  },
 });

 revalidatePath("/");
}
