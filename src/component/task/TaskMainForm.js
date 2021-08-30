import React, { useEffect, useState } from "react";
import {
  PageHeader,
  TextArea,
  Button,
  Box,
  TextField as GTextField,
  Flex,
  TapArea,
} from "gestalt";
import { Tooltip, TextField } from "@material-ui/core";
import StatusComp from "../../component/common/StatusComp";

function TaskMainForm(props) {
  const { failValidationList, handleValidation, task, setTask } = props;
  

  const handleChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;

    let newTask = {
      ...task,
      [field]: value,
    };

    if (field === "task_start") {
      //오늘 날짜보다 이후 일 경우 예정됨으로 변경
      if (new Date(value) > new Date()) {
        newTask = {
          ...newTask,
          task_status: "SH",
        };
      }
    }

    setTask(newTask);
  };

  return (
    <>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <div
          className={
            failValidationList.includes("title") ? "shake-horizontal" : ""
          }
        >
          <GTextField
            label="할 일"
            id="task_title"
            onChange={handleChange("task_title")}
            value={task.task_title || ""}
            errorMessage={handleValidation(task, "title", "task_title", true)}
          />
        </div>
      </Box>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <Flex gap={5}>
          <Flex.Item>
            <Box minWidth={300}>
              <TextField
                id="task_start"
                label="시작일"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange("task_start")}
                value={task.task_start}
              />
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box minWidth={300}>
              <TextField
                id="task_end"
                label="종료일"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange("task_end")}
                value={task.task_end}
                onKeyPress={(e) => e.preventDefault()}
              />
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box maxWidth={250}>
              <StatusComp sDate={task.task_start} eDate={task.task_end} />
            </Box>
          </Flex.Item>
        </Flex>
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <div
          className={
            failValidationList.includes("text") ? "shake-horizontal" : ""
          }
        >
          <TextArea
            id="task_memo"
            onChange={() => {}}
            label="메모"
            rows={15}
            value={task.task_memo || ""}
            onChange={handleChange("task_memo")}
            errorMessage={handleValidation(
              task,
              "text-4000",
              "task_memo",
              false
            )}
          />
        </div>
      </Box>
    </>
  );
}

export default TaskMainForm;
