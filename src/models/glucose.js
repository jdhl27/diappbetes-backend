const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GlucoseSchema = new Schema({
  nivel: Number,
  message: String,
  signupDate: { type: Date, default: Date.now() },
  priority: String,
  id_paciente: String
});

module.exports = mongoose.model("Glucose", GlucoseSchema);
