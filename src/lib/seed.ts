import { prisma } from "./db/prisma";
import data from "../../public/data.json";

export default async function seedDatabase() {
 const transaction = prisma.$transaction([
  prisma.user.create({
   data: {
    name: data.currentUser.username,
    image: data.currentUser.image,
    email: data.currentUser.email,
   },
  }),

  ...data.comments.map((comment) =>
   prisma.comment.create({
    data: {
     content: comment.content,
     score: comment.score,
     createdAt: new Date(),
     // userId will be filled in after the user is created
    },
   })
  ),
 ]);

 const [newUser, ...newComments] = await transaction;

 for (let i = 0; i < newComments.length; i++) {
  const comment = data.comments[i];
  const newComment = newComments[i];

  for (const reply of comment.replies) {
   // create a reply in the database
   await prisma.reply.create({
    data: {
     content: reply.content,
     score: reply.score,
     createdAt: new Date(),
     commentId: newComment.id,
     userId: newUser.id,
    },
   });
  }
 }
}
