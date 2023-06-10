const express = require("express");
const { PrismaClient } = require("@prisma/client");

const DBConnection = require("./db/DBConetion");
const AuthController = require("./controller/auth/AuthController");
const User = require("./model/user/User");
const UserRepository = require("./repository/user/UserRepository");

const app = express();
const userRepository = new UserRepository(User);
const authController = new AuthController(userRepository);

DBConnection.setConnection(new PrismaClient());

app.use(express.json());

app.post("/auth", (req, res) => {
  authController.handler(req, res);
});

app.listen(
  process.env.PORT,
);
