const express = require("express");
const auth = require("../middlewares/auth");
const userControl = require("../controllers/user");
const glucoseControl = require("../controllers/glucose");
const observationControl = require("../controllers/observations");
const api = express.Router();

api.get("/", function (req, res) {
  res.send("Hello World");
});

// User
api.post("/signup", userControl.signUp);
api.post("/signin", userControl.signIn);
api.get("/user", auth.isAuth, userControl.userInfo);

// Glucose
api.post("/glucose", auth.isAuth, glucoseControl.createRegisterGlucose);
api.get("/glucose", auth.isAuth, glucoseControl.getAllRegisterGlucose);

// Glucose
api.post("/observation", auth.isAuth, observationControl.createObervation);
api.get("/observation", auth.isAuth, observationControl.getAllObservation);

module.exports = api;
