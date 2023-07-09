// To connect with your mongoDB database
const mongoose = require("mongoose");
const JsonWebToken = require("jsonwebtoken");
var bodyParser = require("body-parser");

const username = "SantiagoDominaKKKK";
const password = "ssdominaFkkkk5";
const cluster = "voluntariadoapp.dkq6tt8";

const SECRET = "djfiwuw23";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/Users?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  areas: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);
User.createIndexes();

const VoluntarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  nascimento: {
    type: Date,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  celula: {
    type: String,
    required: true,
  },
  b: {
    type: Boolean,
    required: true,
  },
  d: {
    type: Boolean,
    required: true,
  },
  cdo: {
    type: Boolean,
    required: true,
  },
  area: {
    type: Array,
    required: true,
  },
});
const Voluntario = mongoose.model("voluntario", VoluntarioSchema);
Voluntario.createIndexes();

// For backend and express
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(bodyParser.json());
/* app.get("/", (req, resp) => {
  resp.send("App is Working");
}); */

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

if(process.env.DEV !== true){
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}


app.post("/authenticate", (req, res) => {
  fetchUserByToken(req)
    .then((data) => {
      res.json({ success: true, user: data.user, token: data.token });
    })
    .catch((e) => {
      console.log({ success: false, error: e });
      res.json({ success: false, error: e });
    });
});

app.post("/getvolunteers", (req, res) => {
  console.log(req);
  try {
    Voluntario.find()
      .then((data) => {
        console.log(data);
        res.json({ success: true, voluntarios: data });
      })
      .catch((e) => {
        res.json({ success: false, error: e });
      });
  } catch (e) {
    res.json({ success: false, error: e });
  }
});

app.post("/newvoluntary", async (req, res) => {
  console.log("Aaa");
  try {
    const voluntary = new Voluntario({
      nome: req.body.nome,
      nascimento: req.body.nascimento,
      idade: req.body.idade,
      sexo: req.body.sexo,
      numero: req.body.numero,
      email: req.body.email,
      celula: req.body.celula,
      b: req.body.b,
      d: req.body.d,
      cdo: req.body.cdo,
      area: req.body.area,
    });
    let result = await voluntary.save();
    console.log(result);
    result = result.toObject();
    if (result) {
      console.log("Aaaaaaaaaaaaaaa");
      console.log(req.body);
      res.send(result);
      console.log(result);
    } else {
      console.log("A requesição não obteve resultado");
    }
  } catch (e) {
    res.send("Algo deu errado");
  }
});

app.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      pass: req.body.pass,
      email: req.body.email,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      areas: req.body.areas
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

app.post("/login", async (req, res) => {
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
        .catch(() => {
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

app.listen(process.env.PORT || 8080, () => {
  console.log("Running on", process.env.PORT || 8080);
});
