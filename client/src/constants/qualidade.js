const sheetId = "1TT6C6lmwNeznUGes82txf2k91eet7pjVj2TldPEyeSU";
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = "MULTIMÍDIA";
const query = encodeURIComponent("Select *");
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const all_voluntarios = [];

//quase morri pra fazer isso
fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    const jsonData = JSON.parse(rep.substring(47).slice(0, -2));

    jsonData.table.rows.forEach((rowData) => {
      var row = {};
      let volunt = rowData.c;
      let voluntId = volunt[0].v;
      let voluntName = volunt[1].v;
      let voluntBirth = volunt[2] != null ? volunt[2].f : undefined;
      let voluntOld = volunt[3] != null ? volunt[3].v : undefined;
      let voluntGenre = volunt[4] != null ? volunt[4].v : undefined;
      let voluntWPP = volunt[5] != null ? volunt[5].v : undefined;
      let voluntEmail = volunt[6] != null ? volunt[6].v : undefined;
      let voluntCel = volunt[7] != null ? volunt[7].v : undefined;
      let voluntB = volunt[8] != null ? volunt[8].v : undefined;
      let voluntD = volunt[9] != null ? volunt[9].v : undefined;
      let voluntCdO = volunt[10] != null ? volunt[10].v : undefined;
      row = {
        id: voluntId,
        nome: voluntName,
        nascimento: voluntBirth,
        idade: voluntOld,
        sexo: voluntGenre,
        numero: voluntWPP,
        email: voluntEmail,
        celula: voluntCel,
        b: voluntB,
        d: voluntD,
        cdo: voluntCdO,
      };

      all_voluntarios.push(row);
    });
  });
/* var all_voluntarios = [
  {
    id: "#1",
    date: "1 Nov, 10:20 AM",
    email: "pedrãodafirma@gmail.com",
    first_name: "Pedrão",
    last_name: "Da Firma",
    status: "Servindo",
  },
  {
    id: "#2",
    date: "1 Nov, 10:20 AM",
    email: "Kauaalemanha@gmail.com",
    first_name: "Eggerrt (sla como escreve)",
    last_name: "Kauã",
    status: "N faz nada",
  },
]; */

export default all_voluntarios;
