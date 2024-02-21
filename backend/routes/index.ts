import express from "express";
// import { authRouter } from "./auth/auth";
import { usersRouter } from "./users/users";
import { auth } from "../middleware/auth";
import { coursesRouter } from "./courses/courses";

export const routes = express.Router();
// routes.use("/auth", authRouter);
// TODO: ADD AUTH below auth
routes.use("/users", usersRouter);
routes.use('/courses', coursesRouter);
