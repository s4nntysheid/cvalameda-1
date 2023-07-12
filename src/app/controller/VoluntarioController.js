const Voluntario = require("../model/Voluntario");

class VoluntarioController {
  async edit(req, res) {}
  async create(req, res) {
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
    result = result.toObject();

    return res.json(result);
  }
  async index(req, res) {
    const data = await Voluntario.find();

    return res.json({ success: true, voluntarios: data });
  }
}

module.exports.getAllVolunteers = (req, res, next) => {
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
};

module.exports.createNewVolunteer = async (req, res) => {
  console.log("Aaa");
  try {
    const voluntary = new Voluntario({
      name: req.body.nome,
      gender: req.body.sexo,
      birthday: req.body.nascimento,
      cellphone: req.body.numero,
      email: req.body.email,
      smallgroupleader: req.body.celula,
      member: req.body.membro,
      baptized: req.body.batizado,
      escola: req.body.escola,
      cdo: req.body.cdo,
      dna: req.body.dna,
      areas: req.body.areas,
      interviews: req.body.entrevistas
    });
    let result = await voluntary.save();
    result = result.toObject();
    if (result) {
      res.send(result);
    } else {
      console.log("A requesição não obteve resultado");
    }
  } catch (e) {
    res.send("Algo deu errado");
  }
};
