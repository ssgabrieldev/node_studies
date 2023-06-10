const express = require("express");

const AuthController = require("./controller/auth/AuthController");

const app = express();
const authController = new AuthController();

app.get("/auth", authController.handler);

app.listen(
  process.env.PORT,
);
