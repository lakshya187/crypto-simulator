import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ profitLoss }) => {
  const data = {
    labels: ["Profit", "Loss"],
    datasets: [
      {
        //   label: "",
        data: profitLoss,
        backgroundColor: ["#DBDBDB", "#9D9D9D"],
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default PieChart;
