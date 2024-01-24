import { prisma } from "./db/prisma";
import data from "../../public/data.json";

export default async function seedDatabase(id: number) {
 for (const user of data.comments.map((comment) => comment.user)) {
  await prisma.user.upsert({
   where: { email: user.email },
   update: {},
   create: {
    email: user.email,
    name: user.username,
    image: user.image,
   },
  });
 }

 const replies = data.comments.map((comment) => comment.replies).flat();

 for (const user of replies.map((reply) => reply.user)) {
  await prisma.user.upsert({
   where: { email: user.email },
   update: {},
   create: {
    email: user.email,
    name: user.username,
    image: user.image,
   },
  });
 }

 //  seed comments and replies
 for (const comment of data.comments) {
  const createdComment = await prisma.comment.create({
   data: {
    content: comment.content,
    score: comment.score,
    createdAt: new Date(),
    updatedAt: new Date(), // Assuming updatedAt is the same as createdAt for seeding
    User: {
     connect: { email: comment.user.email },
    },
   },
  });

  for (const reply of comment.replies) {
   const replyUserId = await prisma.user.findUnique({
    where: { email: reply.user.email },
    select: { id: true },
   });
   await prisma.reply.create({
    data: {
     content: reply.content,
     score: reply.score,
     createdAt: new Date(),
     updatedAt: new Date(), // Assuming updatedAt is the same as createdAt for seeding
     commentId: createdComment.id,
     userId: replyUserId?.id,
    },
   });
  }
 }
}
