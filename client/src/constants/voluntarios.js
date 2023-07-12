import axios from "axios";

const all_voluntarios = [];

axios
  .post("/api/volunteers", {
    alowed: true,
  })
  .then((result) => {
    let jsonResult = result.data;
    if (jsonResult.success) {
      console.log(result);
      jsonResult.voluntarios.forEach((voluntario) => {
        all_voluntarios.push(voluntario);
      });
      console.log(jsonResult.voluntarios);
    } else {
      alert(jsonResult.error);
    }
  })
  .catch((e) => {
    console.log(e);
  });

/* fetch("http:getvolunteers", {
  method: "POST",
  body: JSON.stringify({ alowed: true }),
  headers: {
    "Content-Type": "application/json",
  },
}).then((result) => {
  var jsonResult = result
    .json()
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(jsonResult);
  if (jsonResult.success) {
    all_voluntarios = jsonResult.voluntarios;
  } else {
    alert(jsonResult.error);
  }
}); */

export default all_voluntarios;
