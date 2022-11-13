const express = require("express");
const auth = require("../middlewares/auth");
const userControl = require('../controllers/user')
const glucoseControl = require('../controllers/glucose')
const api = express.Router();

api.get("/", function (req, res) {
  res.send("Hello World");
});

// User
api.post("/signup", userControl.signUp);
api.post("/signin", userControl.signIn);

api.get("/users", auth.isAuth, function (req, res) {
  res.status(200).send({ message: "Lista de usuarios con acceso" });
});

api.get("/user", auth.isAuth, userControl.userInfo);

// Glucose
api.post("/glucose", glucoseControl.createRegisterGlucose);

module.exports = api;
