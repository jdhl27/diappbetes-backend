const { priority } = require("../middlewares/glucosePriority");
const Glucose = require("../models/glucose");

function createRegisterGlucose(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "No tienes autorizacion" });
  }

  const glucose = new Glucose({
    nivel: req.body.nivel,
    message: req.body.message,
    priority: priority(req.body.nivel),
    id_paciente: req.body.id_paciente,
  });

  glucose.save((err, gluc) => {
    if (err)
      return res
        .status(500)
        .json({ message: `Error al crear el usuario ${err}` });

    return res.status(200).json({ message: gluc });
  });
}

function getAllRegisterGlucose(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "No tienes autorizacion" });
  }

  if (
    req.query &&
    req.query.id_paciente &&
    Object.keys(req.query.id_paciente).length > 0
  ) {
    Glucose.find({ id_paciente: req.query.id_paciente })
      .then((registers) => {
        return res.status(200).send(registers);
      })
      .catch((err) => {
        return res.status(500).json({ message: `Error al ingresar: ${err}` });
      });
  } else {
    res.status(400).json({ message: `Falta el parametro id_paciente` });
  }
}

module.exports = {
  createRegisterGlucose,
  getAllRegisterGlucose,
};
