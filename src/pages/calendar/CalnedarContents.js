import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Box, Text } from "gestalt";
import axios from "../../config/axios/axios";
import { useSelector } from "react-redux";
import { Help } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { CALENDAR_DESC } from "../../config/constants/commonConts";
import TaskModal from "../task/TaskModal";

function CalnedarContents() {
  const [taskList, setTaskList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [taskIdx, setTaskIdx] = useState();
  const project = useSelector((state) => state.project.project);

  const getTaskListAPI = () => {
    axios({
      method: "GET",
      url: "/calendar/list/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      setTaskList(result);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) getTaskListAPI();
  }, [project]);

  const handleDetailModal = (taskIdx) => {
    setTaskIdx(taskIdx);
    setIsModal(true);
  };

  const colorSet = (index) => {
    const colorList = [
      [226, 56, 56],
      [94, 189, 62],
      [0, 156, 223],
      [255, 185, 0],
      [151, 57, 153],
      [247, 130, 0],
    ];

    const idx = index % 10;
    return `rgba(${colorList[idx][0]},${colorList[idx][1]},${
      colorList[idx][2]
    },${1 - idx * 0.1})`;
  };
  let prevIdx = 0;
  let color = "";
  let prevUpper = 0;
  return (
    <>
      {isModal ? (
        <TaskModal taskIdx={taskIdx} modalFlag="VIEW" setIsModal={setIsModal} />
      ) : (
        <></>
      )}
      <Text size="sm" color="gray">
        할일 캘린더 &nbsp;
        <Tooltip title={CALENDAR_DESC} placement="right-end">
          <Help color="disabled" style={{ fontSize: 15 }} />
        </Tooltip>
      </Text>
      <Box>
          <div className="fullcalendar">
        <FullCalendar
          locale="ko"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={
            taskList &&
            taskList.map((item, idx) => {
              if (item.upper_task_idx !== prevUpper) {
                color = colorSet(prevIdx++);
                prevUpper = item.upper_task_idx;
              }
              return {
                title: item.task_title,
                start: new Date(item.task_start).toISOString(),
                end: new Date(item.task_end).toISOString(),
                task_idx: item.task_idx,
                color: color,
              };
            })
          }
          eventClick={function(arg) {
            const taskIdx = arg.event.extendedProps.task_idx;
            handleDetailModal(taskIdx);
          }}
        />
        </div>
      </Box>
    </>
  );
}

export default CalnedarContents;
