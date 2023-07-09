import React, { useState } from "react";
/* import AnyChart from "anychart-react";
import anychart from "anychart"; */
import GenderChart from "../../components/GenderChart";
import AgeGroupChart from "../../components/AgeGroupChart";
import IndustryChart from "../../components/IndustryChart";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/dashboard.css";

const Dashboard = () => {
  // Dados fictícios
  const initialData = {
    men: 120,
    women: 80,
    "13-17": 40,
    "18-30": 150,
    "30-55": 200,
    "60+": 30,
    area1: 50,
    area2: 100,
    area3: 80,
    area4: 120,
    area5: 50,
  };

  /* var chart1 = anychart.stock();
  chart1.container("gender").draw();

  var chart2 = anychart.stock();
  chart2.container("ageGroup").draw(); */

  const [data, setData] = useState(initialData);

  const handleFilter = (filteredData) => {
    setData(filteredData);
  };

  return (
    <div>
      <div className="p-4">
        <div className="d-flex row align-items-center">
          <div className="col header-title">
            <h2>Dashboard</h2>
          </div>
          <div className="col">
            <div className="row counters">
              <div className="col counter">
                <p><strong>123</strong> voluntários</p>
              </div>
              <div className="col counter">
                <p><strong>12</strong> áreas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        onClick={() =>
          handleFilter({
            men: 80,
            women: 60,
            '13-17': 20,
            '18-30': 90,
            '30-55': 120,
            '60+': 20,
            area1: 30,
            area2: 60,
            area3: 40,
            area4: 80,
            area5: 30,
          })
        }
      >
        Filtro
      </button> */}
      <div className="row first-dashboard-line p-4">
        <div className="col">
          <GenderChart data={data} />
        </div>
        <div className="col">
          <AgeGroupChart data={data} />
        </div>
      </div>
      {/* <IndustryChart data={data} /> */}
    </div>
  );
};

export default Dashboard;
