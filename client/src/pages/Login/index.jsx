import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/login.css";

function Register() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
    } else delete axios.defaults.headers.common["Authorization"];
  };
  //let localSavedToken = localStorage.getItem("token");

  /* if(localSavedToken){
  navigate('/')
} */

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("aaaaaaaaaaaa");
    let result = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ name, pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await result);
    let jsonResult = await result.json();
    console.log(jsonResult);
    if (jsonResult.success) {
      localStorage.setItem("token", jsonResult.token);
      if (window.location.pathname == "/") {
        window.location.reload(true);
      } else {
        navigate("/");
      }
      setAuthToken(jsonResult.token);
      setPass("");
      setName("");
    } else {
      alert(jsonResult.error);
    }
  };

  return (
    <div>
      {/* <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div> */}
      <form method="post" className="d-flex justify-content-center">
        <div className="form-login">
          <h3>Log in</h3>

          <div className="form-row row">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              placeholder="Usuário"
              id="username"
              name="user"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row row">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="****"
              name="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="row mt-3">
            <button type="submit" className="btn" onClick={handleOnSubmit}>
              Entrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
