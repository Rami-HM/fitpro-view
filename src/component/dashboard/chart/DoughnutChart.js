import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["완료", "예정", "진행중", "보류", "미처리"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5,1],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart() {
  return (

      <Doughnut data={data} />
  );
}

export default DoughnutChart;
