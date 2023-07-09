//import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import GenderChart from "../../components/GenderChart";
import AgeGroupChart from "../../components/AgeGroupChart";

import cross from "../../assets/icons/cross.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/dashboard.css";

function Dashboard() {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between row align-items-center mb-3 w-100">
        <div className="col header-title">
          <h2>Dashboard</h2>
        </div>
        <div className="col">
          <div className="d-flex flex-row counters">
            <div className="col counter">
              <p>
                <strong>123</strong> voluntários
              </p>
            </div>
            <div className="col counter">
              <p>
                <strong>12</strong> áreas
              </p>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-end">
          <Link className="right-button-orange w-auto" to="/register">
            <img alt="novo voluntario" src={cross} />
            <span className="mx-2 new-user-span"><strong>Novo Usuário</strong></span>
          </Link>
        </div>
      </div>
      * daq pra baixo ignora kkkkkk
      <div className="d-flex justify-content-around my-4">
        <div className="h-100">
          <div className="d-flex justify-content-center">
            <h5>Distribuição por Gênero</h5>
          </div>
          <div className="d-flex align-items-center h-100 chart-container">
            <div className="chart">
              <GenderChart />
            </div>
          </div>
        </div>
        <div className="h-100">
          <div className="d-flex justify-content-center">
            <h5>Distribuição por Idade</h5>
          </div>
          <div className="d-flex align-items-center h-100 chart-container">
            <div className="chart">
              <AgeGroupChart />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div className="h-100">
          <div className="d-flex justify-content-center">
            <h5>Distribuição por Gênero</h5>
          </div>
          <div className="d-flex align-items-center h-100 chart-container">
            <div className="chart">
              <GenderChart />
            </div>
          </div>
        </div>
        <div className="h-100">
          <div className="d-flex justify-content-center">
            <h5>Distribuição por Idade</h5>
          </div>
          <div className="d-flex align-items-center h-100 chart-container">
            <div className="chart">
              <AgeGroupChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
