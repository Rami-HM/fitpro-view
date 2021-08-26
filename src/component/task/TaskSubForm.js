import React, { useEffect, useState } from "react";
import {
  TextArea,
  Box,
  TextField as GTextField,
  SelectList,
  Flex,
} from "gestalt";
import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "../../config/axios/axios";

function TaskForm(props) {
  const {
    failValidationList,
    handleValidation,
    task,
    setTask,
    setMainTask,
  } = props;

  const project = useSelector((state) => state.project.project);
  const failReasonList = useSelector((state) => state.fail.failReason);

  const [isFail, setIsFail] = useState(true);
  const [isWriteFail, setIsWriteFail] = useState(true);

  const [mainTaskList, setMainTaskList] = useState([]);
  const [formatMainTaskList, setFormatMainTaskList] = useState([
    { value: "", label: "" },
  ]);

  // mount > redux > props
  useEffect(() => {
    console.log(task);
  }, []);

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) getMainTaskListAPI();
  }, [project]);
  
  useEffect(() => {
    console.log(task);
    disabledFailReason(task.task_state);
    getMainTaskDetail(mainTaskList);
  }, [task]);

  const disabledFailReason = (value) => {
    if (value === "PD" || value === "FL") {
      setIsFail(false);
    } else {
      setIsWriteFail(true);
      setIsFail(true);
    }
  };

  const getMainTaskListAPI = async (prj_idx) => {
    await axios({
      method: "GET",
      url: "/task/main/list/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      const formatMainTaskList = result.map((item) => {
        return { value: String(item.task_idx), label: item.task_title };
      });
      setMainTaskList(result);
      setFormatMainTaskList(formatMainTaskList);
    });
  };

  const getMainTaskDetail = async (list) => {
    const mainTaskDetail = await list.find(
      (item) => item.task_idx.toString() === task.upper_task_idx
    );
    console.log(task);
    console.log(task.upper_task_idx);
    console.log(mainTaskDetail);
    setMainTask(mainTaskDetail);
  };

  const handleChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;

    let newTask = {
      ...task,
      [field]: value,
    };

    if (value !== "" || value) {
      if (field === "upper_task_idx") {
        getMainTaskDetail(mainTaskList);
      }

      if (field === "task_state") {
        disabledFailReason(value);
        newTask = { ...newTask, fail_idx: "-", fail_contents: "" };
      }

      if (field === "fail_idx") {
        if (value === "add") {
          setIsWriteFail(false);
        } else {
          newTask = {
            ...newTask,
            fail_contents: "",
          };
          setIsWriteFail(true);
        }
      }
    }
    setTask(newTask);
  };

  return (
    <>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <SelectList
          id="main_task"
          onChange={handleChange("upper_task_idx")}
          options={formatMainTaskList}
          label="메인 할일"
          size="md"
          value={task.upper_task_idx || ""}
        />
      </Box>
      <div
        className={
          failValidationList.includes("title") ? "shake-horizontal" : ""
        }
      >
        <Box flex="grow" paddingX={3} paddingY={3}>
          <GTextField
            label="할 일"
            id="task_title"
            onChange={handleChange("task_title")}
            value={task.task_title || ""}
            errorMessage={handleValidation(task, "title", "task_title", true)}
          />
        </Box>
      </div>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <Flex gap={5}>
          <Flex.Item>
            <Box minWidth={250}>
              <SelectList
                id="task_important"
                onChange={handleChange("task_important")}
                options={[
                  { label: "매우높음", value: "O" },
                  { label: "높음", value: "A" },
                  { label: "중간", value: "B" },
                  { label: "낮음", value: "C" },
                ]}
                label="중요도"
                size="md"
                value={task.task_important}
              />
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box minWidth={200}>
              <SelectList
                id="task_state"
                onChange={handleChange("task_state")}
                options={[
                  { label: "예정됨", value: "SH" },
                  { label: "진행중", value: "PG" },
                  { label: "보류", value: "PD" },
                  { label: "완료됨", value: "CP" },
                  { label: "미처리", value: "FL" },
                ]}
                label="진행상태"
                size="md"
                value={task.task_state}
              />
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box minWidth={340}>
              <SelectList
                id="task_state"
                onChange={handleChange("fail_idx")}
                options={failReasonList}
                label="미처리 및 보류 사유"
                size="md"
                value={task.fail_idx || "-"}
                disabled={isFail}
              />
            </Box>
          </Flex.Item>
        </Flex>
      </Box>

      <Box
        flex="grow"
        paddingX={3}
        paddingY={3}
        display={isWriteFail ? "none" : "block"}
      >
        <div
          className={
            failValidationList.includes("fail_contents")
              ? "shake-horizontal"
              : ""
          }
        >
          <GTextField
            id="fail_contents"
            label="미처리 및 보류 사유"
            placeholder="사유를 입력 하세요"
            helperText="작성하신 사유는 자동으로 저장 됩니다."
            onChange={handleChange("fail_contents")}
            value={task.fail_contents || ""}
            errorMessage={handleValidation(
              task,
              "fail_contents",
              "fail_contents",
              false
            )}
          ></GTextField>
        </div>
      </Box>

      <Box flex="grow" paddingX={3} paddingY={3}>
        <Box
          display="flex"
          wrap
          marginStart={-3}
          marginEnd={-3}
          marginBottom={-3}
          marginTop={-3}
        >
          <Box flex="grow" paddingX={3} paddingY={3}>
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
          <Box flex="grow" paddingX={3} paddingY={3}>
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
        </Box>
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

export default TaskForm;
