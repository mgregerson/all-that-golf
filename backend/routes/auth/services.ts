import { compareSync, hash } from "bcrypt";
import { prisma } from "../../lib/prisma";
import { sign } from "jsonwebtoken";

// export async function login(email: string, password: string) {
//   try {
//     const foundUser = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (!foundUser) {
//       throw new Error("User not found");
//     }

//     const isMatch = compareSync(password, foundUser.password);

//     if (!isMatch) {
//       throw new Error("Incorrect password");
//     }

//     const token = sign(
//       { _id: foundUser.id?.toString(), username: foundUser.username },
//       process.env.SECRET_KEY as string,
//       {
//         expiresIn: "2 days",
//       }
//     );

//     return {
//       user: {
//         id: foundUser.id,
//         username: foundUser.username,
//         email: foundUser.email,
//       },
//       token,
//     };
//   } catch (error: any) {
//     return { error: error.message };
//   }
// }

// export async function register(
//   username: string,
//   email: string,
//   password: string
// ) {
//   const hashedPassword = await hash(password, 12);

//   console.log("got into register");

//   // Check if a user with that username or email already exists

//   const foundUser = await prisma.user.findFirst({
//     where: {
//       OR: [{ username }, { email }],
//     },
//   });

//   if (foundUser) {
//     throw new Error("A user with this username or email already exists.");
//   }

//   const user = await prisma.user.create({
//     data: {
//       username,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//     },
//   });

//   return user;
// }
