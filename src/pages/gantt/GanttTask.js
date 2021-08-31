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
} from "@syncfusion/ej2-react-gantt";
import "./gantt.css";

const GanttData = [
  {
    id: 1,
    title: "Project Initiation",
    sdate: new Date("04/02/2019"),
    edate: new Date("04/21/2019"),
    child: [
      {
        id: 2,
        title: "Identify Site location",
        sdate: new Date("04/02/2019"),
        duration: 0.1,
      },
      { id: 3, title: "Perform Soil test", sdate: new Date("04/02/2019") },
      {
        id: 4,
        title: "Soil test approval",
        sdate: new Date("04/02/2019"),
        child: [
          {
            id: 2,
            title: "Identify Site location",
            sdate: new Date("04/02/2019"),
            duration: 0.1,
          },
          { id: 3, title: "Perform Soil test", sdate: new Date("04/02/2019") },
          { id: 4, title: "Soil test approval", sdate: new Date("04/02/2019") },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Project Estimation",
    sdate: new Date("04/02/2019"),
    edate: new Date("04/21/2019"),
    child: [
      {
        id: 6,
        title: "Develop floor plan for estimation",
        sdate: new Date("04/04/2019"),
        duration: 3,
        Progress: 50,
      },
      {
        id: 7,
        title: "List materials",
        sdate: new Date("04/04/2019"),
        duration: 3,
        Progress: 50,
      },
      {
        id: 8,
        title: "Estimation approval",
        sdate: new Date("04/04/2019"),
        duration: 3,
        Progress: 50,
      },
    ],
  },
];

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

  const [taskList, setTaskList] = useState(GanttData);

  const [isModal, setIsModal] = useState(false);
  const [taskIdx, setTaskIdx] = useState();

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
      console.log("newTaskList :", newTaskList);
      setTaskList(newTaskList);
    });
  };

  useEffect(() => {
    const curr = new Date();
    console.log(curr);
    if (userSession.hasOwnProperty("mem_idx")) getGanttListAPI();

    console.log("taskList", taskList);
  }, [userSession]);

  const customizeCell = (args) => {
    args.data.ganttProperties.duration = args.data.taskData.tempDuration;
    args.data.ganttProperties.startDate = new Date(
      args.data.taskData.tempSDate
    );
    args.data.ganttProperties.endDate = new Date(args.data.taskData.tempEDate);
  };

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [timelineSettings, setTimelineSettings] = React.useState({
    timelineViewMode: "Week",
  });

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex);
    console.log(activeTabIndex);
    setTimelineSettings(activeTabIndex === 0 ? {
      timelineViewMode: "Week",
    } : {
      timelineUnitSize: 65,
      topTier: {
        unit: "Day",
        format: "MMM dd, yyyy",
      },
      bottomTier: {
        unit: "Hour",
        format: "hh:mm a",
      },
    });
  };

  useEffect(()=>{
    console.log(timelineSettings);
  },[timelineSettings])

  const tabs = [{ text: "주 단위" }, { text: "시간 단위" }];

  const dayWorkingTime = [{ from: 0, to: 24 }];
  return (
    <Module>
      <Box minHeight="80vh" maxWidth="90vw">
        <Tabs
          activeTabIndex={activeIndex}
          onChange={handleChange}
          tabs={tabs}
        />
        <GanttComponent
          dayWorkingTime={dayWorkingTime}
          queryCellInfo={customizeCell}
          timelineSettings={timelineSettings}
          splitterSettings={{ columnIndex: 3 }}
          dataSource={taskList}
          taskFields={taskFields}
          durationUnit={"minute"}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="title"
              headerText="제목"
              width="300"
            ></ColumnDirective>
            <ColumnDirective
              field="sdate"
              headerText="시작일"
              width="250"
              formatter={(_, row) => {
                const { tempSDate } = row.taskData;
                return tempSDate;
              }}
            ></ColumnDirective>
            <ColumnDirective
              field="edate"
              headerText="종료일"
              width="250"
              formatter={(_, row) => {
                const { tempEDate } = row.taskData;
                return tempEDate;
              }}
            ></ColumnDirective>
            <ColumnDirective
              field="duration"
              headerText="기간(분 단위)"
              formatter={(_, row) => {
                const { tempDuration } = row.taskData;
                return tempDuration;
              }}
            />
          </ColumnsDirective>
        </GanttComponent>
      </Box>
    </Module>
  );
}

export default GanttTask;
