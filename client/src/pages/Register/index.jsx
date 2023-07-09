import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./css/register.css";

function Register() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("aaaaaaaaaaaa");
    let result = await fetch("/register", {
      method: "POST",
      body: JSON.stringify({ name: name, pass: pass, email: email, isAdmin: isAdmin, areas: getAreas() }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await result);
    let jsonResult = await result.json();
    console.log(jsonResult, ". ;", area);
    if (jsonResult) {
      alert("Usuário cadastrado com sucesso!");
    } else {
      alert("ERRO!");
    }
  };

  return (
    <>
      <div className="dashboard-content-header">
        <h2>Novo Usuário</h2>
      </div>
      <form className="d-flex align-items-center newvolunt-form" method="post">
        <div className="form-container">
          <div className="form-row row">
            <div className="form-group col-md">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md">
              <label htmlFor="nome">Senha</label>
              <input
                type="password"
                className="form-control"
                name="pass"
                id="pass"
                placeholder="Senha"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row row mt-4">
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
            <div className="form-row row col-md">
              <div className="form-check form-group form-check-inline col row ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isadmin"
                  id="admincb"
                  value={isAdmin}
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(!isAdmin)}
                />
                <label className="form-check-label" htmlFor="admincb">
                  Admin
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
                    value={"qualidade"}
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
                    value={"liderança"}
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
                    value={"intercessão"}
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
                    value={"comunicação"}
                  />

                  <label className="form-check-label" htmlFor="comunicacao">
                    Comunicação
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="fotografia"
                    name="area"
                    value={"fotografia"}
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
                    value={"stories"}
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
                    value={"recepção"}
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
                    value={"libertação"}
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
                    value={"integração"}
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
                    value={"libras"}
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
                    value={"acessível"}
                  />
                  <label className="form-check-label" htmlFor="acessivel">
                    Acessível
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

export default Register;
