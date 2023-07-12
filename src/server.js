const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const mongoose = require("mongoose");
const JsonWebToken = require("jsonwebtoken");
const routes = require("./routes");

const db = require("./database/config");

const cors = require("cors");
const path = require("path");
const app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

const http = require("http").Server(app);

http.listen(process.env.PORT || 8080, () => {
  console.log("Running on", process.env.PORT || 8080);
});
