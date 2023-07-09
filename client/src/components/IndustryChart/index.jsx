import React from 'react';
/* import { Doughnut } from 'react-chartjs-2'; */
import AnyChart from "anychart-react";

const IndustryChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Distribuição de Pessoas por Áreas</h2>
      <AnyChart
        id="gender"
        width={450}
        height={300}
        type="pie"
        data={chartData}
        title="Distribuição de Gênero"
      />
    </div>
  );
};

export default IndustryChart;
