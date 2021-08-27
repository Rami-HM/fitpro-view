import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import axios from "../../../config/axios/axios";
import { draw } from "patternomaly";

const defaultdata = {
  labels: ["완료", "예정", "진행중", "보류", "미처리"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 1],
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

const zerodata = {
  labels: ["할일이 없습니다."],
  datasets: [
    {
      label: "No Data",
      data: [1],
      backgroundColor: [
        draw("diagonal-right-left", "rgba(100, 100, 100, 0.2)"),
      ],
      borderColor: ["rgba(100, 100, 100, 0.6)"],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart() {
  const project = useSelector((state) => state.project.project);
  const userSesscion = useSelector((state) => state.member.member);

  const [data, setData] = useState(defaultdata);

  const getMyStatsAPI = () => {
    axios({
      method: "GET",
      url:
        "/stats/total/" + project.prj_idx + "?mem_idx=" + userSesscion.mem_idx,
    }).then((res) => {
      const result = res.data.data;

      const newLabel = result.map((item) => item.task_state_desc);
      const newCntData = result.map((item) => item.cnt);

      let defaultDatasets = [{ ...defaultdata.datasets }][0][0];
      defaultDatasets.data = newCntData;

      const newData = {
        ...defaultdata,
        labels: newLabel,
        datasets: [{ ...defaultDatasets }],
      };

      if (newCntData.reduce((pre, cur) => pre + cur) === 0) setData(zerodata);
      else setData(newData);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      getMyStatsAPI();
    }
  }, [project]);

  return <Doughnut data={data ? data : zerodata} />;
}

export default DoughnutChart;
