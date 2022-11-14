const { priority } = require("../middlewares/glucosePriority");
const Glucose = require("../models/glucose");
const service = require("../services");

function createRegisterGlucose(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }

  const glucose = new Glucose({
    nivel: req.body.nivel,
    message: req.body.message,
    signupDate: req.body.signupDate,
    priority: priority(req.body.nivel),
    id_paciente: req.body.id_paciente,
  });

  glucose.save((err, gluc) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al crear el usuario ${err}` });

    return res.status(200).send({ message: gluc });
  });
}

function getAllRegisterGlucose(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }

  Glucose.find()
    .then((registers) => {
      return res.status(200).send(registers);
    })
    .catch((err) => {
      return res.status(500).send({ message: `Error al ingresar: ${err}` });
    });
}

module.exports = {
  createRegisterGlucose,
  getAllRegisterGlucose,
};
