const Voluntario = require("../model/Voluntario");

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
  try {
    const existingVolunteer = await Voluntario.find({ cellphone: req.body.numero })

    if (existingVolunteer) {
      const volunteer = {
        ...existingVolunteer,
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
      }
      let result = await volunteer.save();
      result = result.toObject();
      if (result) {
        res.send(result);
      } else {
        console.log("A requesição não obteve resultado");
      }
    } else {
      const volunteer = new Voluntario({
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
      let result = await volunteer.save();
      result = result.toObject();
      if (result) {
        res.send(result);
      } else {
        console.log("A requesição não obteve resultado");
      }
    }


  } catch (e) {
    res.send("Algo deu errado");
  }
};
