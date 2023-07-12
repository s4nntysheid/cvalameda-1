const mongoose = require("mongoose");
const express = require("express");
const JsonWebToken = require("jsonwebtoken");
const routes = express.Router();

const db = require("./database/config");

const SECRET = "djfiwuw23";

mongoose
  .connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

const User = require("./app/model/User")

const VoluntarioController = require("./app/controller/VoluntarioController")

const app = express();
const cors = require("cors");
const path = require("path");

var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

function fetchUserByToken(req) {
  return new Promise((resolve, reject) => {
    if (req.body.token) {
      let authorization = req.body.token;
      let decoded;
      try {
        decoded = JsonWebToken.verify(authorization, SECRET);
      } catch (e) {
        reject("Token not valid");
        return;
      }
      let userId = decoded.id;
      console.log(userId);
      User.findOne({ _id: userId })
        .then((user) => {
          console.log("user:", user);
          resolve({ user: user, token: req.body.token });
        })
        .catch((err) => {
          reject("Token error");
        });
    } else {
      reject("No token found");
    }
  }).catch((err) => {
    console.log(err);
  });
}

if (process.env.DEV !== true) {
  app.use(express.static(path.join(__dirname, "client/build")));
  routes.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

routes.post("/authenticate", (req, res) => {
  fetchUserByToken(req)
    .then((data) => {
      res.json({ success: true, user: data.user, token: data.token });
    })
    .catch((e) => {
      console.log({ success: false, error: e });
      res.json({ success: false, error: e });
    });
});

routes.post("/volunteers", VoluntarioController.getAllVolunteers);

routes.post("/newvolunteer", VoluntarioController.createNewVolunteer);

/* routes.post("/areas")

routes.post("/newarea") */

/* 
routes.post("/editarea")

routes.post("/deletearea")
 */

routes.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      pass: req.body.pass,
      email: req.body.email,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      areas: req.body.areas,
    });
    let result = await user.save();
    console.log(result);
    result = result.toObject();
    if (result) {
      delete result.password;
      console.log("Aaaaaaaaaaaaaaa");
      console.log(req.body);
      res.send(result);
      console.log(result);
    } else {
      console.log("Usuário já existe");
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

routes.post("/login", async (req, res) => {
  if (!req.body.name || !req.body.pass) {
    res.json({ success: false, error: "Complete todos os espaços!" });
  } else {
    try {
      User.findOne({ name: req.body.name })
        .then((user) => {
          
          if (req.body.pass === user.pass) {
            const token = JsonWebToken.sign(
              { id: user._id, name: user.name },
              SECRET
            );
            res.json({ success: true, token: token });
          } else {
            res.json({
              success: false,
              error: "Nome de usuário ou senha incorreto!!",
            });
          }
        })
        .catch((e) => {
          console.log(e)
          res.json({
            success: false,
            error: "Nome de usuário ou senha incorreto!!",
          });
        });
    } catch (e) {
      res.json({ success: false, error: e });
    }
  }
});

module.exports = routes;
