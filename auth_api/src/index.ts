import express, { json, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import DBConetion from "./db/DBConetion";
import SignUpController from "./controller/signUp/SignUpController";
import User from "./model/user/User";
import UserRepository from "./repository/user/UserRepository";

const app = express();
const userRepository = new UserRepository(User);
const signUpController = new SignUpController(userRepository);

DBConetion.setConnection(new PrismaClient());

app.use(json());

app.post("/signup", (req: Request, res: Response) => {
  signUpController.handler(req, res);
});

app.listen(
  process.env.PORT,
  () => console.log(`server running at http://localhost:${process.env.PORT}`)
);
