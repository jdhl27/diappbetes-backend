const Glucose = require("../models/glucose");
const service = require("../services");

function createRegisterGlucose(req, res) {
  const glucose = new Glucose({
    nivel: req.body.nivel,
    message: req.body.message,
    signupDate: req.body.signupDate,
    priority: req.body.priority,
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

module.exports = {
  createRegisterGlucose,
};
