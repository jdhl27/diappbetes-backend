const express = require("express");
const auth = require("../middlewares/auth");
const userControl = require('../controllers/user')
const api = express.Router();

api.get("/", function (req, res) {
  res.send("Hello World");
});

api.post("/signup", userControl.signUp);
api.post("/signin", userControl.signIn);

api.get("/users", auth.isAuth, function (req, res) {
  res.status(200).send({ message: "Lista de usuarios con acceso" });
});

api.get("/user", auth.isAuth, userControl.userInfo);

// app.get("/hola/:name", function (req, res) {
//   res.send({ message: `Hello ${req.params.name}` });
// });

module.exports = api;
