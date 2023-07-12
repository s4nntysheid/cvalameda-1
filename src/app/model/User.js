const mongoose = require("../../database");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, required: true },
  areas: { type: Array, required: true },
  date: { type: Date, default: Date.now },
});
const User = mongoose.model("User", UserSchema);
/* User.createIndexes(); */

module.exports = User;
