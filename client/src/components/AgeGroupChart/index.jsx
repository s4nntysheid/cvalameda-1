import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as Chartjs } from "chart.js/auto";
import { ageGroups } from "../../constants/age-groups";

export const AgeGroupChart = () => {
  const [chartData, setChartData] = useState({
    labels: ageGroups.map((data) => data.label),
    datasets: [
      {
        data: ageGroups.map((data) => data.value),
        backgroundColor: ageGroups.map((data) => data.backgroundColor),
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Remove a legenda
      },
    },
    maintainAspectRatio: false
  };
  return <Bar data={chartData} options={chartOptions} width={333} height={200} />;
};

export default AgeGroupChart;
