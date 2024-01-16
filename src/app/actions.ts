// import { prisma } from "@/lib/db/prisma";
// import seedDatabase from "@/lib/seed";

// export async function handleLogin(req, res) {
//  // check if user is new
//  const user = await prisma.user.findUnique({
//   where: {
//    email: req.body.email,
//   },
//  });

//  if (!user) {
//   const newUser = await prisma.user.create({
//    data: {
//     email: req.body.email,
//    },
//   });

//   await seedDatabase(newUser.id);
//  }
// }
