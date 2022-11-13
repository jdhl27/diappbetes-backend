const User = require("../models/user");
const service = require("../services");

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    password: req.body.password,
    isMedical: req.body.isMedical,
  });

  user.avatar = user.gravatar();

  user.save((err) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al crear el usuario ${err}` });

    return res.status(200).send({ token: service.createToken(user) });
  });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).send({ message: `Error al ingresar: ${err}` });
    if (!user)
      return res
        .status(404)
        .send({ message: `No existe el usuario: ${req.body.email}` });

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err)
        return res.status(500).send({ message: `Error al ingresar: ${err}` });
      if (!isMatch)
        return res
          .status(404)
          .send({ message: `Error de contraseña: ${req.body.email}` });

      console.log(user);
      req.user = user;

      User.findById(user._id).then((userInfo) => {
        return res.status(200).send({
          message: "Te has logueado correctamente",
          token: service.createToken(user),
          user: userInfo
        });
      }).catch((err) => {
        return res.status(500).send({ message: `Error al ingresar: ${err}` });
      });

      
    });
  }).select("_id email +password");
}

function userInfo(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }

  const token = req.headers.authorization.split(" ")[1];
  service
    .decodeToken(token)
    .then((response) => {
      User.findById(response).then((user) => {
        return res.status(200).send({ user: user });
      }).catch((err) => {
        return res.status(500).send({ message: `Error al ingresar: ${err}` });
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: `Error al ingresar: ${err}` });
    });
}

module.exports = {
  signUp,
  signIn,
  userInfo,
};
