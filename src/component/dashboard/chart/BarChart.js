import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import axios from "../../../config/axios/axios";

const backgroundColorList = (traNum) => {
  const colors = [
    `rgba(255, 99, 132, ${traNum})`,
    `rgba(54, 162, 235, ${traNum})`,
    `rgba(255, 206, 86, ${traNum})`,
    `rgba(75, 192, 192, ${traNum})`,
    `rgba(153, 102, 255,${traNum})`,
    `rgba(255, 159, 64, ${traNum})`,
  ];

  return colors;
};

const drawData = (labels, data, isData) => {
  const defaultdata = {
    labels: labels
      ? labels
      : [],
    datasets: [
      {
        data: data ? data : [],
        backgroundColor: data ? backgroundColorList(0.2) : "",
        borderColor: data ? backgroundColorList(1) : "",
        borderWidth: 1,
      },
    ],
  };

  return defaultdata;
};

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "미처리 및 보류 사유 통계",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min:5,
          stepSize: 1,
        },
      },
    ],
  },
};

function BarChart() {
  const project = useSelector((state) => state.project.project);

  const [data, setData] = useState(drawData());

  const formatData = (result) => {
    const newLabel = result.map((item) => item.fail_contents);
    const newCntData = result.map((item) => item.cnt);

    let newData = drawData(newLabel, newCntData);

    if (newCntData.reduce((pre, cur) => pre + cur) === 0)
      newData = drawData(["미처리 및 보류 건이 없습니다."], []);

    return newData;
  };

  const getTotalStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/fail/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      const newData = formatData(result);
      setData(newData);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      getTotalStatsAPI();
    }
  }, [project]);

  return <Bar data={data} options={options} />;
}
export default BarChart;
