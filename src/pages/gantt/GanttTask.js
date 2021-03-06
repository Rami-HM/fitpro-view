import React, { useEffect, useState } from "react";
import { Module, Box, Tabs } from "gestalt";
import TimeLine from "react-gantt-timeline";

import axios from "../../config/axios/axios";
import { useSelector } from "react-redux";

//import { GanttComponent } from '@syncfusion/ej2-react-gantt';
import {
  GanttComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";
import "./gantt.css";

import { convertMinutes } from "../../util/common";

const taskFields = {
  id: "id",
  name: "title",
  startDate: "sdate",
  endDate: "edate",
  duration: "duration",
  // durationUnit: "durationunit",
  parentID: "upper_idx",
};

function GanttTask() {
  const userSession = useSelector((state) => state.member.member);

  const [taskList, setTaskList] = useState();

  const getGanttListAPI = async () => {
    await axios({
      method: "GET",
      url: "/gantt/list/" + userSession.mem_idx,
    }).then((res) => {
      const result = res.data.data;
      const newTaskList = result.map((r) => {
        const { sdate, edate, duration } = r;

        return {
          ...r,
          tempSDate: sdate,
          tempEDate: edate,
          tempDuration: duration,
        };
      });
      setTaskList(newTaskList);
    });
  };

  useEffect(() => {
    if (userSession.hasOwnProperty("mem_idx")) getGanttListAPI();
  }, [userSession]);

  const customizeCell = (args) => {
    args.data.ganttProperties.duration = args.data.taskData.tempDuration;
    args.data.ganttProperties.startDate = new Date(
      args.data.taskData.tempSDate
    );
    args.data.ganttProperties.endDate = new Date(args.data.taskData.tempEDate);
  };

  const rowDataBound = (args) => {
    if (!args.data["upper_idx"]) {
      args.row.style.background = "#f2f2f2";
    }
  };

  const dayWorkingTime = [{ from: 0, to: 24 }];
  return (
    <Module>
      <Box minHeight="80vh" maxWidth="90vw">
        <GanttComponent
          dayWorkingTime={dayWorkingTime}
          queryCellInfo={customizeCell}
          splitterSettings={{ columnIndex: 3 }}
          dataSource={taskList}
          taskFields={taskFields}
          toolbar={["ZoomIn", "ZoomOut", "ZoomToFit"]}
          durationUnit={"minute"}
          rowDataBound={rowDataBound}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="title"
              headerText=" "
              width="300"
            ></ColumnDirective>
            <ColumnDirective
              field="sdate"
              headerText="?????????"
              width="200"
              formatter={(_, row) => {
                const { tempSDate } = row.taskData;
                return tempSDate;
              }}
            ></ColumnDirective>
            <ColumnDirective
              field="edate"
              headerText="?????????"
              width="200"
              formatter={(_, row) => {
                const { tempEDate } = row.taskData;
                return tempEDate;
              }}
            ></ColumnDirective>
            <ColumnDirective
              field="duration"
              headerText="??????"
              formatter={(_, row) => {
                const { tempDuration } = row.taskData;

                return convertMinutes(tempDuration);
              }}
            />
          </ColumnsDirective>
          <Inject services={[Toolbar]} />
        </GanttComponent>
      </Box>
    </Module>
  );
}

export default GanttTask;
