const { generatePDF } = require("../middlewares/utils");
const Observation = require("../models/observations");

function createObervation(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }

  const observation = new Observation({
    recommendations: req.body.recommendations,
    files: generatePDF(),
    id_paciente: req.body.id_paciente,
    id_medico: req.body.id_medico,
  });

  observation.save((err, obs) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al crear el usuario ${err}` });

    return res.status(200).send({ message: obs });
  });
}

function getAllObservation(req, res) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorizacion" });
  }

  if (
    req.query &&
    req.query.id_paciente &&
    Object.keys(req.query.id_paciente).length > 0
  ) {
    Observation.find({ id_paciente: req.query.id_paciente })
      .then((registers) => {
        return res.status(200).send(registers);
      })
      .catch((err) => {
        return res.status(500).send({ message: `Error al ingresar: ${err}` });
      });
  } else {
    res.status(400).send({ message: `Falta el parametro id_paciente` });
  }
}

module.exports = {
  createObervation,
  getAllObservation,
};
