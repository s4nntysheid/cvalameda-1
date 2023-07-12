const mongoose = require("../../database");

const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  leaders: { type: Array, required: true },
  trainings: { type: Area, required: true }
});
const Area = mongoose.model("Area", AreaSchema);
/* User.createIndexes(); */

module.exports = Area;
