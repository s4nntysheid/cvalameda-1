let mongoose = require("mongoose");
let mongoURI = require("./config");
mongoose.connect(mongoURI.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = mongoose
