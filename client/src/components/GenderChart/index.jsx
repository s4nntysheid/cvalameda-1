import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as Chartjs } from "chart.js/auto";

import genders from "../../constants/genders";

import "./styles.css";

export const GenderChart = () => {
  const [chartData, setChartData] = useState({
    labels: genders.map((data) => data.label),
    datasets: [
      {
        data: genders.map((data) => data.value),
        backgroundColor: genders.map((data) => data.color),
        hoverBackgroundColor: genders.map((data) => data.highlight),
      },
    ],
  });

  const chartOptions = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Pie data={chartData} options={chartOptions} width={333} height={200} />
  );
};

export default GenderChart;
