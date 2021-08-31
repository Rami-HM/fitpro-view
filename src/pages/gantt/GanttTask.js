import React, { useEffect, useState } from "react";
import { Module, Box, SegmentedControl } from "gestalt";
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
  durationUnit: "durationunit",
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

      const newTaskList = result.map(item=>{
        const newSdate =  new Date(item.sdate);
        const newEdate =  new Date(item.edate);

        console.log(item.idx, ' :: ', newSdate,' :: ', newEdate);
        return({...item,sdate:newSdate, edate: newEdate});
      });

      console.log(newTaskList);

      setTaskList(newTaskList);
    });
  };

  useEffect(() => {
    const curr = new Date();
    console.log(curr);
    if (userSession.hasOwnProperty("mem_idx")) getGanttListAPI();

    console.log("taskList", taskList);
  }, [userSession]);

  const rowDataBound = (args) => {
    if (args.data.taskData.important === "O")
      args.row.style.backgroundColor = "red";
    else if (args.data.taskData.important === "A")
      args.row.style.backgroundColor = "orange";
    else if (args.data.taskData.important === "B")
      args.row.style.backgroundColor = "blue";
    else if (args.data.taskData.important === "C")
      args.row.style.backgroundColor = "green";
  };

  const customizeCell = (args) => {
    console.log(args);
    // if(args.data.taskData.important === 'O')
    //   args.cell.style.backgroundColor = "red";
    // else if(args.data.taskData.important === 'A')
    //   args.cell.style.backgroundColor = "orange";
    // else if(args.data.taskData.important === 'B')
    //   args.cell.style.backgroundColor = "blue";
    // else if(args.data.taskData.important === 'C')
    //   args.cell.style.backgroundColor = "green";
  };

  const formatOption = { type: 'dateTime', format: 'yyyy-MM-dd hh:mm a' };
  const timelineSettings = {
      timelineViewMode: 'Week'
  };
  const timelineSettings2 = {
    timelineUnitSize: 65,
    topTier: {
        unit: 'Day',
        format: 'MMM dd, yyyy'
    },
    bottomTier: {
        unit: 'Hour',
        format: 'hh:mm a'
    }
  };
const dayWorkingTime = [{ from: 0, to: 24 }];
  return (
    <Module>
      <Box minHeight="80vh" maxWidth="90vw">
        <GanttComponent timezone = "Asia/Seoul" dayWorkingTime={dayWorkingTime} timelineSettings  = {timelineSettings} splitterSettings = {{columnIndex: 4}} dataSource={taskList} taskFields={taskFields}>
          <ColumnsDirective>
            <ColumnDirective field="id"></ColumnDirective>
            <ColumnDirective field="title"  headerText='Job Name' width='250'></ColumnDirective>
            <ColumnDirective field="sdate" format={formatOption}></ColumnDirective>
            <ColumnDirective field="edate" format={formatOption}></ColumnDirective>
          </ColumnsDirective>
        </GanttComponent>
      </Box>
    </Module>
  );
}

export default GanttTask;
