// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// function generateTypingTestText(wordCount: number) {
//   // Replace this with your logic to generate 300 words of text for typing tests.
//   // You can use lorem ipsum text or any other method.
//   // For simplicity, we'll generate a repeating pattern.
//   const pattern = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
//   const repetitions = Math.ceil(wordCount / pattern.split(" ").length);
//   const text = pattern.repeat(repetitions);
//   return text.slice(0, wordCount); // Trim to the desired word count
// }

// async function typingTests() {
//   const typingTestTemplates = [
//     {
//       title: "Easy Typing Test 1",
//       text: generateTypingTestText(300),
//       difficulty: "easy",
//     },
//     {
//       title: "Easy Typing Test 2",
//       text: generateTypingTestText(300),
//       difficulty: "easy",
//     },
//     {
//       title: "Medium Typing Test 1",
//       text: generateTypingTestText(300),
//       difficulty: "medium",
//     },
//     {
//       title: "Medium Typing Test 2",
//       text: generateTypingTestText(300),
//       difficulty: "medium",
//     },
//     {
//       title: "Hard Typing Test 1",
//       text: generateTypingTestText(300),
//       difficulty: "hard",
//     },
//     {
//       title: "Hard Typing Test 2",
//       text: generateTypingTestText(300),
//       difficulty: "hard",
//     },
//   ];

//   for (const template of typingTestTemplates) {
//     const existingTest = await prisma.typingTest.findFirst({
//       where: {
//         title: template.title,
//       },
//     });

//     if (!existingTest) {
//       await prisma.typingTest.create({
//         data: {
//           title: template.title,
//           text: template.text,
//           difficulty: template.difficulty as Difficulty,
//         },
//       });
//       console.log(`Typing test "${template.title}" created.`);
//     } else {
//       console.log(`Typing test "${template.title}" already exists, skipping.`);
//     }
//   }

//   console.log("Typing tests seeded successfully");
// }

// async function users() {
//   const BCRYPT_WORK_FACTOR = 12;
//   const existingUser = await prisma.user.findUnique({
//     where: { username: "testuser" },
//   });

//   if (existingUser) {
//     // User with the username already exists; you can update here if needed
//     const updatedUser = await prisma.user.update({
//       where: { id: existingUser.id },
//       data: {
//         email: "newemail@test.com",
//         firstName: "newfirstname",
//         lastName: "newlastname",
//       },
//     });

//     console.log("User updated:", updatedUser);
//   } else {
//     // User with the username doesn't exist; you can create here
//     const hashedPassword = await bcrypt.hash("password", BCRYPT_WORK_FACTOR);

//     const newUser = await prisma.user.create({
//       data: {
//         email: "test@test.com",
//         username: "testuser",
//         password: hashedPassword,
//         firstName: "test",
//         lastName: "user",
//       },
//     });
//     console.log("User created:", newUser);
//   }
// }

// users()
//   .catch((error) => {
//     console.error(error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// typingTests()
//   .catch((error) => {
//     console.error(error);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
