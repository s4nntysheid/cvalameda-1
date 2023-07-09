import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { default as ptBR } from "date-fns/esm/locale/pt-BR";

//import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/newarea.css";

function NewArea() {
  registerLocale("pt-BR", ptBR);
  setDefaultLocale("pt-BR");

  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [idade, setIdade] = useState(0);
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [celula, setCelula] = useState("");
  const [b, setB] = useState(false);
  const [d, setD] = useState(false);
  const [cdo, setCdo] = useState(false);
  const [area, setArea] = useState([]);

  const getAreas = () => {
    const areas = [];

    const areaChecks = document.getElementsByName("area");
    for (var i = 0; i < areaChecks.length; i++) {
      if (areaChecks[i].checked) areas.push(areaChecks[i].value);
    }
    setArea([areas]);
    return areas;
  };
  
  const navigate = useNavigate()

  const handleOnSubmit = async (e) => {
    e.preventDefault();


    var result = await fetch("/newvoluntary", {
      method: "POST",
      body: JSON.stringify({
        nome: nome,
        nascimento: nascimento,
        idade: idade,
        sexo: sexo,
        numero: numero,
        email: email,
        celula: celula,
        b: b,
        d: d,
        cdo: cdo,
        area: getAreas(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await result);
    let jsonResult = await result;
    console.log(jsonResult);
    if (jsonResult) {
      console.log(area)
      navigate('/')
    } else {
      alert("babababababab");
    }
  };

  return (
    <>
      <div className="dashboard-content-header">
        <h2>Novo Voluntario</h2>
      </div>
      <form className="d-flex align-items-center newvolunt-form" method="post">
        <div className="form-container">
          <div className="form-row row">
            <div className="form-group col-md">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                id="nome"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="form-group col-md">
              <label htmlFor="sexo">Sexo</label>
              <select
                name="sexo"
                id="sexo"
                className="form-control"
                value={sexo}
                onChange={(e) => {
                  setSexo(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option defaultValue>Escolha...</option>
                <option>Masculino</option>
                <option>Feminino</option>
              </select>
            </div>
          </div>
          <div className="form-row row mt-4">
            <div className="form-group col-sm-3">
              <label htmlFor="nascimento">Nascimento</label>
              <DatePicker
                id="nascimento"
                name="nascimento"
                className="form-control"
                selected={nascimento}
                onChange={(date) => setNascimento(date)}
              />
            </div>
            <div className="form-group col-sm-2">
              <label htmlFor="idade">Idade</label>
              <input
                type="number"
                className="form-control"
                name="idade"
                id="idade"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="numero">Número</label>
              <input
                type="text"
                className="form-control"
                id="numero"
                name="numero"
                placeholder="(xx) 9 xxxx-xxxx"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="form-group col-md">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="exemplo@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex form-row row align-items-center mt-4">
            <div className="form-group col-md-3">
              <label htmlFor="celula">Célula</label>
              <input
                type="text"
                className="form-control"
                name="celula"
                id="celula"
                placeholder="(líder)"
                value={celula}
                onChange={(e) => setCelula(e.target.value)}
              />
            </div>
            <div className="form-row row col-md">
              <div className="form-check form-group form-check-inline col row ">
                {/* <Form.Check checked={checked1} onChange={handleCheck1Change} /> */}
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="b"
                  id="b"
                  value={b}
                  checked={b}
                  onChange={(e) => setB(!b)}
                />
                <label className="form-check-label" htmlFor="b">
                  Batisado
                </label>
              </div>
              <div className="form-check form-group form-check-inline col row ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="d"
                  id="d"
                  value={d}
                  checked={d}
                  onChange={(e) => setD(!d)}
                />
                <label className="form-check-label" htmlFor="d">
                  2
                </label>
              </div>
              <div className="form-check form-group form-check-inline col row ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="cdo"
                  id="cdo"
                  value={cdo}
                  checked={cdo}
                  onChange={(e) => {
                    setCdo(!cdo);
                    console.log(!cdo);
                  }}
                />
                <label className="form-check-label" htmlFor="cdo">
                  Casa do Oleiro
                </label>
              </div>
            </div>
          </div>
          <div className="form-row row checkboxes-row">
            <div className="form-group col-sm-2">
              <label>Áreas:</label>
            </div>
            <div className="form-group col-sm">
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="qualidade"
                    name="area"
                    value={"Qualidade"}
                  />
                  <label className="form-check-label" htmlFor="qualidade">
                    Qualidade Total
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="lideranca"
                    name="area"
                    value={"Liderança"}
                  />
                  <label className="form-check-label" htmlFor="lideranca">
                    Liderança
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="intercessao"
                    name="area"
                    value={"Intercessão"}
                  />
                  <label className="form-check-label" htmlFor="intercessao">
                    Intercessão
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="comunicacao"
                    name="area"
                    value={"Comunicação"}
                  />

                  <label className="form-check-label" htmlFor="comunicacao">
                    comunicação
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="fotografia"
                    name="area"
                    value={"Fotografia"}
                  />
                  <label className="form-check-label" htmlFor="fotografia">
                    Fotografia
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="stories"
                    name="area"
                    value={"Stories"}
                  />
                  <label className="form-check-label" htmlFor="stories">
                    Stories
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="recepcao"
                    name="area"
                    value={"Recepção"}
                  />
                  <label className="form-check-label" htmlFor="recepcao">
                    Recepção
                  </label>
                </li>
              </ul>
            </div>
            <div className="form-group col-sm">
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="libertacao"
                    name="area"
                    value={"Libertação"}
                  />
                  <label className="form-check-label" htmlFor="libertacao">
                    Libertação
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="integracao"
                    name="area"
                    value={"Integração"}
                  />
                  <label className="form-check-label" htmlFor="integracao">
                    Integração
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="libras"
                    name="area"
                    value={"Libras"}
                  />
                  <label className="form-check-label" htmlFor="libras">
                    Libras
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="kids" name="area" value={"kids"} />
                  <label className="form-check-label" htmlFor="kids">
                    Kids
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="acessivel"
                    name="area"
                    value={"Acessível"}
                  />
                  <label className="form-check-label" htmlFor="acessivel">
                    Acessível
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="transito"
                    name="area"
                    value={"Trânsito"}
                  />
                  <label className="form-check-label" htmlFor="transito">
                    Trânsito
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="ldc" name="area" value={"Líder de Célula"} />
                  <label className="form-check-label" htmlFor="ldc">
                    Lider de Célula
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="form-row row">
            <div className="col">
              <Link to="/" className="btn btn-secondary">
                Fechar
              </Link>
            </div>
            <div className="col">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleOnSubmit}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewArea;
