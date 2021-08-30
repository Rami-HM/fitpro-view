import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import axios from "../../../config/axios/axios";
import { draw } from "patternomaly";

function DoughnutChart() {

  const backgroundColorList = (traNum) => {
    const colors = [
      `rgba(54, 162, 235, ${traNum})`,
      `rgba(255, 206, 86, ${traNum})`,
      `rgba(75, 192, 192, ${traNum})`,
      `rgba(153, 102, 255,${traNum})`,
      `rgba(255, 99, 132, ${traNum})`,
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
          backgroundColor: isData ? backgroundColorList(0.2) : [
            draw("diagonal-right-left", "rgba(100, 100, 100, 0.2)"),
          ],
          borderColor: isData ? backgroundColorList(1) : ["rgba(100, 100, 100, 0.6)"],
          borderWidth: 1,
        },
      ],
    };
  
    return defaultdata;
  };

  const project = useSelector((state) => state.project.project);
  const userSesscion = useSelector((state) => state.member.member);

  const [data, setData] = useState(drawData());

  const formatData = (result) => {
    const newLabel = result.map((item) => item.task_state_desc);
    const newCntData = result.map((item) => item.cnt);

    let newData = drawData(newLabel, newCntData, true);

    if (newCntData.reduce((pre, cur) => pre + cur) === 0)
      newData = drawData(['할일이 없습니다.'],[1],false);

    return newData;
  };

  const getMyStatsAPI = () => {
    axios({
      method: "GET",
      url:
        "/stats/total/" + project.prj_idx + "?mem_idx=" + userSesscion.mem_idx,
    }).then((res) => {
      const result = res.data.data;
      const newData = formatData(result);
      setData(newData);
    });
  };

  const getTotalStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/total/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      const newData = formatData(result);
      setData(newData);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      true ? getTotalStatsAPI() : getMyStatsAPI();
    }
  }, [project]);

  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: true ? "해당 프로젝트 전체 상태별 서브 테스크 수" : "상태별 나의 서브 테스크 수",
          },
        },
      }}
    />
  );
}

export default DoughnutChart;
