const User = require("../models/user");
const service = require("../services");

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
  });

  user.avatar = user.gravatar();

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario ${err}` });

    return res.status(200).send({ token: service.createToken(user) });
  });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` });
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

      req.user = user;
      return res.status(200).send({
        message: "Te has logueado correctamente",
        token: service.createToken(user),
      });
    });
  }).select("_id email +password");
}

module.exports = {
  signUp,
  signIn,
};
