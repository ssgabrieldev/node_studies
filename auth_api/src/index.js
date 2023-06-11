const express = require("express");
const { PrismaClient } = require("@prisma/client");

const DBConnection = require("./db/DBConetion");
const SignUpController = require("./controller/signUp/SignUpController");
const User = require("./model/user/User");
const UserRepository = require("./repository/user/UserRepository");

const app = express();
const userRepository = new UserRepository(User);
const signUpController = new SignUpController(userRepository);

DBConnection.setConnection(new PrismaClient());

app.use(express.json());

app.post("/signup", (req, res) => {
  signUpController.handler(req, res);
});

app.listen(
  process.env.PORT,
);
