import React, { useEffect, useState } from "react";
import {
  PageHeader,
  TextArea,
  Button,
  Box,
  TextField as GTextField,
  Flex,
} from "gestalt";
import { Tooltip, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "../../config/axios/axios";
import ProjectStatus from "../../component/common/ProjcetStatus";

//validation
import {
  resetValiFields,
  getFailValidationList,
  handleValidation,
} from "../../actions/validation/validation";

function TaskForm(props) {
  const { mode, onDismiss } = props;
  const project = useSelector((state) => state.project.project);
  const userSession = useSelector((state) => state.member.member);

  //validation
  const [failValidationList, setFailValidationList] = useState([]);

  const [task, setTask] = useState({
    task_idx: "",
    task_title: "",
    task_memo: "",
    task_start: project.prj_start + "T00:01" || "2000-01-01T00:01",
    task_end: project.prj_end + "T23:59" || "9999-12-31T23:59",
    reg_mem_idx: "",
    prj_idx: "",
    task_important: "",
    task_status: "",
  });

  useEffect(() => {
    if (mode === "Modify") {
    }
  }, []);

  useEffect(() => {
    if (failValidationList.length !== 0) {
      setTimeout(() => {
        setFailValidationList([]);
      }, 1500);
    }
  }, [failValidationList]);

  const resetForm = () => {
    setTask({
      task_idx: "",
      task_title: "",
      task_memo: "",
      task_start: project.prj_start + "T00:01" || "2000-01-01T00:01",
      task_end: project.prj_end + "T23:59" || "9999-12-31T23:59",
      reg_mem_idx: "",
      prj_idx: "",
      task_important: "",
      task_status: "",
    });
    resetValiFields();
    setFailValidationList([]);
  };

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

  const registeProject = async () => {
    const list = getFailValidationList();

    console.log(list);
    if (list.length !== 0) {
      setFailValidationList(list);
      return;
    }

    insertMainTask();
  };

  const insertMainTask = () => {
    axios({
      method: "POST",
      url: "/task/insert",
      data: {
        ...task,
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
                <ProjectStatus sDate={task.task_start} eDate={task.task_end} />
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
                true
              )}
            />
          </div>
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
              onClick={registeProject}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskForm;
