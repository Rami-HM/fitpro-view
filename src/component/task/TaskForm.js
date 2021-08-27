import React, { useEffect, useState } from "react";
import { PageHeader, Button, Box, TapArea } from "gestalt";
import axios from "../../config/axios/axios";
import { useDispatch } from "react-redux";
import ProjectSelectList from "../../component/project/ProjectSelectList";

import { actionCreators as projectAction } from "../../redux/modules/project";
import { actionCreators as failAction } from "../../redux/modules/fail";
import { actionCreators as ToastAction } from "../../redux/modules/toast";
import { useSelector } from "react-redux";

import TaskMainForm from "./TaskMainForm";
import TaskSubForm from "./TaskSubForm";

//validation
import {
  resetValiFields,
  getFailValidationList,
  handleValidation,
  checkTaskDate,
} from "../../actions/validation/validation";

function TaskForm(props) {
  const {
    mode,
    modalFlag,
    onDismiss,
    taskList,
    setTaskList,
    taskIdx,
    upperTaskIdx,
    itemIndex,
  } = props;

  const project = useSelector((state) => state.project.project);
  const userSession = useSelector((state) => state.member.member);
  const failReason = useSelector((state) => state.fail.failReason);

  const [isProjectChange, setIsProjectChange] = useState(false);

  const dispatch = useDispatch();

  //validation
  const [failValidationList, setFailValidationList] = useState([]);

  const defaultTask = {
    task_idx: "",
    task_title: "",
    task_memo: "",
    task_start: project.prj_start + "T00:00" || "2000-01-01T00:00",
    task_end: project.prj_end + "T23:00" || "9999-12-31T23:00",
    reg_mem_idx: "",
    prj_idx: "",
    task_important: "O",
    task_state: "SH",
    upper_task_idx: upperTaskIdx ? upperTaskIdx.toString() : '',
    fail_idx: "",
    fail_contents: "",
  };

  const [task, setTask] = useState(defaultTask);
  const [mainTask, setMainTask] = useState();

  useEffect(() => {
    if (mode === "Modify") {
      getTaskDetailAPI();
    }
  }, []);

  //유효성 검사에서 통과하지 못한 Input 태그의 에니메이션 효과 노출 후 제거
  useEffect(() => {
    if (failValidationList.length !== 0) {
      setTimeout(() => {
        setFailValidationList([]);
      }, 1500);
    }
  }, [failValidationList]);

  // 해당 할일 세부정보 조회 API
  const getTaskDetailAPI = async () => {
    await axios({
      method: "GET",
      url: "/task/detail/" + taskIdx,
    }).then((res) => {
      const result = res.data.data;
      if (result) {
        // 사용하는 UI 의 Select 에서 value 값은 String 으로 지정 되어있음
        const taskDateil = {
          ...result,
          upper_task_idx: result.upper_task_idx
            ? result.upper_task_idx.toString()
            : result.upper_task_idx,
          fail_idx: result.fail_idx ? result.fail_idx.toString() : "-",
        };
        setTask(taskDateil);
        if (project.prj_idx !== result.prj_idx) {
          projectDetail({ value: result.prj_idx });
        }
      }
    });
  };

  const resetForm = () => {
    setTask(defaultTask);
    resetValiFields();
    setFailValidationList([]);
  };

  // 해당 프로젝트를 redux 저장
  const projectDetail = async (project) => {
    try {
      dispatch(projectAction.getProject(Number(project.value)));
    } catch (error) {
      console.log(error);
    }
  };

  // 할일 저장 (수정, 추가)
  const saveTask = async () => {
    const list = getFailValidationList();

    // 서브 할일 일 경우, 보류 및 미처리 사유를 직접 입력 으로 설정햇을 경우, 필수값 처리
    if (modalFlag === "SUB") {
      if (task.task_state === "PD" || task.task_state === "FL")
        if (task.fail_idx === "add" && task.fail_contents.length === 0)
          list.push("fail_contents");
    }
    if (list.length !== 0) {
      setFailValidationList(list);
      return;
    }

    if (modalFlag === "MAIN") {
      // 프로젝트 날짜 유효성 추가
      const checkDateResult = checkTaskDate(
        task,
        project.prj_start,
        project.prj_end,
        project.prj_title
      );
      if (!checkDateResult.isSuc) {
        dispatch(ToastAction.showToast(checkDateResult.msg));
        return;
      }
      if (mode === "Modify") updateMainTask();
      else insertMainTask();
    } else if (modalFlag === "SUB") {
      // 프로젝트 날짜 유효성 추가
      console.log(mainTask);
      const checkDateResult = checkTaskDate(
        task,
        mainTask.task_start,
        mainTask.task_end,
        mainTask.task_title
      );
      if (!checkDateResult.isSuc) {
        dispatch(ToastAction.showToast(checkDateResult.msg));
        return;
      }
      if (mode === "Modify") updateSubTask();
      else insertSubTask();
    }
  };

  // 메인 할일 추가
  const insertMainTask = () => {
    axios({
      method: "POST",
      url: "/task/insert",
      data: {
        task_title: task.task_title,
        task_memo: task.task_memo,
        task_start: task.task_start,
        task_end: task.task_end,
        task_important: task.task_important,
        task_status: task.task_status,
        reg_mem_idx: userSession.mem_idx,
        prj_idx: project.prj_idx,
      },
    }).then((res) => {
      dispatch(ToastAction.showToast(res.data.message));
      onDismiss();
    });
  };

  //메인 할일 수정
  const updateMainTask = () => {
    const data= {
        task_title: task.task_title,
        task_memo: task.task_memo,
        task_start: task.task_start,
        task_end: task.task_end,
        task_important: task.task_important,
        task_status: task.task_status,
        reg_mem_idx: userSession.mem_idx,
        prj_idx: project.prj_idx,
    };

    axios({
      method: "POST",
      url: "/task/main/modify/" + task.task_idx,
      data,
    }).then((res) => {
      dispatch(ToastAction.showToast(res.data.message));
      if (taskList) {
        const newTaskList = taskList.map((item) => {
          return item.task_idx === task.task_idx
            ? {
                ...res.data.data,
                id: task.task_idx,
              }
            : item;
        });
        setTaskList(newTaskList);
      }
      onDismiss();
    });
  };

  // 서브 할일 추가
  const insertSubTask = () => {
    const data = {
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
    };

    axios({
      method: "POST",
      url: "/task/sub/insert",
      data,
    }).then((res) => {
      dispatch(ToastAction.showToast(res.data.message));

      const result = res.data.data;

      if (data.fail_idx === "add") {
        addFailReason(data.fail_contents, res.data.data.fail_idx);
      }
      const newTaskList = [...taskList, { ...result, id: result.task_idx }];

      setTaskList(newTaskList);

      onDismiss();
    });
  };

  // 서브할일 수정
  const updateSubTask = () => {
    const data = {
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
    };

    axios({
      method: "POST",
      url: "/task/sub/modify/" + task.task_idx,
      data,
    }).then((res) => {
      dispatch(ToastAction.showToast(res.data.message));
      if (taskList) {
        const newTaskList = taskList.map((item) => {
          return item.task_idx === task.task_idx
            ? {
                ...res.data.data,
                id: task.task_idx,
              }
            : item;
        });
        if (data.fail_idx === "add") {
          addFailReason(data.fail_contents, res.data.data.fail_idx);
        }
        setTaskList(newTaskList);
      }
      onDismiss();
    });
  };

  // 미처리 사유 redux 저장
  const addFailReason = (label, value) => {
    const fail = { label, value: String(value) };
    dispatch(failAction.setFailReason([...failReason, fail]));
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
        {isProjectChange ? (
          <ProjectSelectList handleSelect={projectDetail} />
        ) : (
          <TapArea
            flex="grow"
            paddingX={3}
            paddingY={3}
            onTap={() => setIsProjectChange(true)}
          >
            <PageHeader
              title={project.prj_title}
              maxWidth="40vw"
              subtext={project.prj_sub_title}
            />
          </TapArea>
        )}
        {modalFlag === "MAIN" ? (
          <TaskMainForm
            failValidationList={failValidationList}
            handleValidation={handleValidation}
            task={task}
            setTask={setTask}
          />
        ) : (
          <TaskSubForm
            failValidationList={failValidationList}
            handleValidation={handleValidation}
            task={task}
            setTask={setTask}
            mainTaskIdx={task.upper_task_idx}
            setMainTask={setMainTask}
          />
        )}
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
              onClick={saveTask}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskForm;
