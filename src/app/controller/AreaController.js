const Area = require("../model/Area");

module.exports.getAllAreas = (req, res, next) => {
  try {
    Area.find()
      .then((data) => {
        console.log(data);
        res.json({ success: true, areas: data });
      })
      .catch((e) => {
        res.json({ success: false, error: e });
      });
  } catch (e) {
    res.json({ success: false, error: e });
  }
};

module.exports.createNewArea = async (req, res) => {
  try {
    const area = new Area({
      name: req.body.name,
      leaders: req.body.leaders,
      trainings: req.body.trainings
    });
    let result = await area.save();
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
