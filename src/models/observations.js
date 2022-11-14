const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObservationsSchema = new Schema({
  recommendations: String,
  files: { type: Array, default: [] },
  signupDate: { type: Date, default: Date.now() },
  id_paciente: String,
  id_medico: String,
});

module.exports = mongoose.model("Observations", ObservationsSchema);
