import React, { useEffect, useState } from "react";
import { Module, Box } from "gestalt";
import { Chart } from "react-google-charts";

import axios from "../../config/axios/axios";
import { useSelector } from "react-redux";

function GanttTask() {
  const userSession = useSelector(state=>state.member.member);

  const [taskList, setTaskList] = useState([
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
  ]);
  const [isModal, setIsModal] = useState(false);
  const [taskIdx, setTaskIdx] = useState();

  const getGanttListAPI = async () => {
    await axios({
      method: "GET",
      url: "/gantt/list/"+userSession.mem_idx,
    }).then((res) => {
      const result = res.data.data;
      let newTaskList = [];
      result.map((item) => {
        let result = [];
        result.push(item.idx);
        result.push(item.title);
        result.push(item.idx);
        result.push(new Date(item.start));
        result.push(new Date(item.end));
        result.push(0);
        result.push(100);
        result.push(item.upper_idx);
        newTaskList = [...newTaskList, result];
      });

      setTaskList([...taskList, ...newTaskList]);
    });
  };

  useEffect(() => {
    if (userSession.hasOwnProperty('mem_idx')) getGanttListAPI();

    console.log("taskList", taskList);
  }, [userSession]);

  return (
    <Module>
      <Box minHeight="90vh">
        <Chart
          chartType="Gantt"
          loader={<div>Loading Chart</div>}
          data={taskList}
          options={{
            height: 7000,
            width : 12000,
            gantt: {
              trackHeight: 30,
            },
          }}
        />
      </Box>
    </Module>
  );
}

export default GanttTask;
