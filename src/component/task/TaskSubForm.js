import React, { useEffect, useRef, useState } from "react";
import {
  PageHeader,
  TextArea,
  Button,
  Box,
  TextField as GTextField,
  SelectList,
  Flex,
} from "gestalt";
import { Tooltip, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios/axios";


function TaskForm(props) {
  const { mode, onDismiss, mainTaskIdx } = props;
  const project = useSelector((state) => state.project.project);
  const userSession = useSelector((state) => state.member.member);

  const [isFail, setIsFail] = useState(true);
  const [isWriteFail, setIsWriteFail] = useState(true);

  const [failReasonList, setFailReasonList] = useState([
    {
      label: "-",
      value: "null",
    },
  ]);

  const [task, setTask] = useState({
    task_idx: "",
    task_title: "",
    task_memo: "",
    task_start: project.prj_start + "T00:01" || "2000-01-01T00:01",
    task_end: project.prj_end + "T23:59" || "9999-12-31T23:59",
    reg_mem_idx: "",
    prj_idx: "",
    task_important: "O",
    task_state: "SH",
    upper_task_idx: mainTaskIdx,
    fail_idx: "",
    fail_contents: "",
  });

  useEffect(() => {
    getFailReasonAPI();
    
    if (mode === "Modify") {
    }
   }, []);
   

   const formatFailReason = (failReason) =>{
    const result = failReason.map(item=>{
      return({
        label: item.fail_contents, value: item.fail_idx.toString()
      });
    });
    return result;
  }

  const getFailReasonAPI = async() =>{
    axios({
      method : "GET",
      url : '/fail/reason'
    }).then((res)=>{
      const result = res.data.data;
      const formatReason = formatFailReason(result);
      setFailReasonList([
        ...failReasonList,
        ...formatReason,
        { label: "직접 입력", value: "add" },
      ])
    })
  }

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
          task_state: "SH",
        };
      }
    }

    if (field === "task_state") {
      if (value === "PD" || value === "FL") {
        setIsFail(false);
      } else {
        newTask = {
          ...newTask,
          fail_idx: "",
          fail_contents: "",
        };
        setIsWriteFail(true);
        setIsFail(true);
      }
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

    setTask(newTask);
  };

  const insertSubTask = () => {

    axios({
      method: "POST",
      url: "/task/sub/insert",
      data: {
        task_title: task.task_title,
        task_memo: task.task_memo,
        task_start: task.task_start,
        task_end: task.task_end,
        task_important: task.task_important,
        task_state: task.task_state,
        upper_task_idx: task.upper_task_idx,
        fail_idx: task.fail_idx,
        fail_contents: task.fail_contents,

        reg_mem_idx: userSession.mem_idx,
        prj_idx: project.prj_idx,
      },
    }).then((res) => {
      alert(res.data.message);
      onDismiss();
    });
  };

  return (
    <Box>
      <Box
        display="flex"
        marginStart={-3}
        marginEnd={-3}
        marginBottom={-3}
        marginTop={-3}
        wrap
        width="100%"
        direction="column"
      >
        <Tooltip title={project.prj_title}>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <PageHeader
              title={project.prj_title}
              maxWidth="40vw"
              subtext={project.prj_sub_title}
            />
          </Box>
        </Tooltip>

        <Box flex="grow" paddingX={3} paddingY={3}>
          <GTextField
            label="할 일"
            id="task_title"
            onChange={handleChange("task_title")}
            value={task.task_title || ""}
          />
        </Box>
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
                  value={task.fail_idx}
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
          <GTextField
            id="fail_contents"
            label="미처리 및 보류 사유"
            placeholder="사유를 입력 하세요"
            helperText="작성하신 사유는 자동으로 저장 됩니다."
            onChange={handleChange("fail_contents")}
            value={task.fail_contents}
          ></GTextField>
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
          <TextArea
            id="task_memo"
            onChange={() => {}}
            label="메모"
            rows={15}
            value={task.task_memo || ""}
            onChange={handleChange("task_memo")}
          />
        </Box>
      </Box>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <Box
          justifyContent="end"
          marginStart={-1}
          marginEnd={-1}
          marginTop={-1}
          marginBottom={-1}
          display="flex"
          wrap
        >
          <Box paddingX={1} paddingY={1}>
            <Button text="Cancel" size="lg" onClick={onDismiss} />
          </Box>
          <Box paddingX={1} paddingY={1}>
            <Button
              text="Submit"
              color="red"
              size="lg"
              type="button"
              onClick={insertSubTask}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskForm;
