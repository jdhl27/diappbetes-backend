const User = require("../models/user");
const Glucose = require("../models/glucose");
const service = require("../services");

async function signUp(req, res) {
  let id_medico = null;
  if (!req.body.isMedical) {
    const users = await User.find({ isMedical: true });
    if (users.length > 0) {
      const num = Math.floor(Math.random() * users.length);
      id_medico = users[num]._id;
    }
  }

  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    signupDate: req.body.signupDate,
    password: req.body.password,
    isMedical: req.body.isMedical,
    id_medico: id_medico,
  });

  user.avatar = user.gravatar();

  user.save((err, userNew) => {
    if (err)
      return res
        .status(500)
        .json({ message: `Error al crear el usuario ${err}` });

    return res
      .status(200)
      .json({ token: service.createToken(user), user: userNew });
  });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({ message: `Error al ingresar: ${err}` });
    if (!user)
      return res
        .status(404)
        .json({ message: `No existe el usuario: ${req.body.email}` });

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: `Error al ingresar: ${err}` });
      if (!isMatch)
        return res
          .status(404)
          .json({ message: `Error de contraseña: ${req.body.email}` });

      console.log(user);
      req.user = user;

      User.findById(user._id)
        .then((userInfo) => {
          return res.status(200).json({
            message: "Te has logueado correctamente",
            token: service.createToken(user),
            user: userInfo,
          });
        })
        .catch((err) => {
          return res.status(500).json({ message: `Error al ingresar: ${err}` });
        });
    });
  }).select("_id email +password");
}

function userInfo(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "No tienes autorizacion" });
  }

  const token = req.headers.authorization.split(" ")[1];
  service
    .decodeToken(token)
    .then((response) => {
      User.findById(response)
        .then((user) => {
          return res.status(200).json({ user: user });
        })
        .catch((err) => {
          return res.status(500).json({ message: `Error al ingresar: ${err}` });
        });
    })
    .catch((err) => {
      return res.status(500).json({ message: `Error al ingresar: ${err}` });
    });
}

function userInfoId(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "No tienes autorizacion" });
  }

  User.findById(req.query.id_user)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(500).json({ message: `Error al ingresar: ${err}` });
    });
}

function listPatients(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "No tienes autorizacion" });
  }

  const token = req.headers.authorization.split(" ")[1];
  service
    .decodeToken(token)
    .then(async (response) => {
      let arrayGlucoses = [];
      const users = await User.find({ id_medico: response });
      if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          const registers = await Glucose.find({ id_paciente: user._id });
          if (registers.length > 0) {
            registers.forEach((element) => {
              let obj = { ...element._doc };
              obj["displayName"] = user.displayName;
              obj["avatar"] = user.avatar;
              arrayGlucoses.push(obj);
            });
          }
        }
        return res.status(200).send(arrayGlucoses);
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: `Error al ingresar: ${err}` });
    });
}

module.exports = {
  signUp,
  signIn,
  userInfo,
  userInfoId,
  listPatients,
};
