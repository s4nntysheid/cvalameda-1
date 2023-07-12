const mongoose = require("../../database");

const VoluntarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: String, required: true },
  cellphone: { type: String, required: true },
  email: { type: String, required: true },
  smallgroupleader: { type: String, required: true },
  member: { type: Boolean, required: true },
  baptized: { type: Boolean, required: true },
  escola: { type: Boolean, required: true },
  cdo: { type: Boolean, required: true },
  dna: { type: Boolean, required: true },
  areas: { type: Array, required: true },
  interviews: { type: Array, required: true },
});
const Voluntario = mongoose.model("voluntario", VoluntarioSchema);
Voluntario.createIndexes();

module.exports = Voluntario;
