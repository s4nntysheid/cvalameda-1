import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/icons/Logo CVA 1.png';

import axios from "axios";

//import "bootstrap/dist/css/bootstrap.min.css";

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
    let result = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ name, pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log(await result);
    let jsonResult = await result.json();
    //console.log(jsonResult);
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
      <form method="post"  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <img src={logo} width={150} />
        <div className="card" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 400}}>
          <h3>Bem-Vindo de volta 🧡</h3>
          <div style={{marginBlock: 30}}>
            <div>
              <label htmlFor="username">Email</label>
              <input
                type="text"
                placeholder="Seu email cadastrado"
                id="username"
                name="user"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                name="pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                />
            </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, marginTop: 15}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <input type="checkbox" id="savesession" name="savesession"/><label htmlFor="savesession" style={{display: 'flex', flexDirection: 'row'}}>Manter conectado</label>
            </div>
            <div>Esqueceu sua senha?</div>
          </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary" onClick={handleOnSubmit}>
              Entrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
