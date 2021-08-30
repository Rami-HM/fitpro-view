import React, { useEffect, useState } from "react";
import { IconButton, Module, Tooltip, TapArea, Box } from "gestalt";
import { useSelector } from "react-redux";
import axios from "../../config/axios/axios";
import TreeList from "react-treelist";
import "react-treelist/build/css/index.css";
import StatusComp from "../../component/common/StatusComp";
import MemberModal from "../member/MemberModal";

import TaskModal from "./TaskModal";

import { classImport } from "../../util/common";

const defaultTask = {
  fail_idx: "",
  prj_idx: "",
  reg_date: "",
  reg_mem_idx: "",
  task_end: "",
  task_idx: "",
  task_important: "",
  task_memo: "",
  task_start: "",
  task_state: "",
  task_title: "",
  upper_task_idx: "",
  upt_date: "",
  worker: "",
  id: "",
  parentId: "",
};

function ProjectTaskList() {
  const project = useSelector((state) => state.project.project);

  const [isModal, setIsModal] = useState(false);
  const [isOpenMemberView, setIsOpenMemberView] = useState(false);

  const [taskList, setTaskList] = useState([defaultTask]);
  const [taskIdx, setTaskIdx] = useState();
  const [upperTaskIdx, setUpperTaskIdx] = useState();

  const [memberIdx, setMemberIdx] = useState();
  const [modalFlag, setModalFlag] = useState();

  const [options, setOptions] = useState({
    minimumColWidth: 100,
    expandAll: true,
    rowClass: "align-left hgt-50px",
    canSelect: true,
    expandAll: true,
  });

  const getTaskListAPI = () => {
    axios({
      method: "GET",
      url: "/task/project/list/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      setTaskList(result);
    });
  };

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    if (!isModal) if (project.hasOwnProperty("prj_idx")) getTaskListAPI();
  }, [project, isModal]);

  const resetForm = () => {
    setTaskIdx("");
    setUpperTaskIdx("");
    setIsOpenMemberView(false);
  };

  const showModal = (flag) => (idx, upperIdx) => {
    resetForm();

    setTaskIdx(idx);
    setUpperTaskIdx(upperIdx);
    setModalFlag(flag);
    setIsModal(true);
  };

  const showMemberView = (idx) => {
    resetForm();
    setMemberIdx(idx);

    setIsOpenMemberView(true);
  };

  const taskAddButton = (row, rows) => {
    if (!row)
      return (
        <Tooltip inline text="서브 할일 추가" idealDirection="down">
          <IconButton
            icon="add"
            size="xs"
            accessibilityLabel="add"
            onClick={() => showModal("SUB")("", rows.task_idx)}
          />
        </Tooltip>
      );
  };

  const processComp = (row, rows) => {
    if (!rows.upper_task_idx)
      return <StatusComp sDate={rows.task_start} eDate={rows.task_end} />;

    return row;
  };

  const titleComp = (row, rows) => {
    const taskIdx = rows.task_idx;
    return (
      <TapArea onTap={() => showModal("VIEW")(taskIdx)}>
        <Box display="flex" justifyContent="start" alignContent="center">
          {row}
        </Box>
      </TapArea>
    );
  };

  const workerComp = (row, rows) => {
    const workerIdx = rows.reg_mem_idx;
    return (
      <TapArea onTap={() => showMemberView(workerIdx)}>
        <Box display="flex" justifyContent="center" alignContent="center">
          {row}
        </Box>
      </TapArea>
    );
  };

  return (
    <>
      {isOpenMemberView ? (
        <MemberModal
          onDismiss={() => setIsOpenMemberView(false)}
          mode={"View"}
          idx={memberIdx}
        />
      ) : (
        <></>
      )}
      {isModal ? (
        <TaskModal
          taskIdx={taskIdx}
          modalFlag={modalFlag}
          setIsModal={setIsModal}
          taskList={taskList}
          setTaskList={setTaskList}
          resetForm={resetForm}
          upperTaskIdx={upperTaskIdx}
        />
      ) : (
        <Module id="taskList">
          <TreeList
            data={taskList}
            columns={[
              {
                title: (
                  <>
                    <Tooltip inline text="메인 할일 추가" idealDirection="down">
                      <IconButton
                        icon="duplicate"
                        size="sm"
                        accessibilityLabel="add"
                        inline
                        onClick={() => showModal("MAIN")()}
                      />
                    </Tooltip>
                  </>
                ),
                field: "upper_task_idx",
                type: "string",
                width: "80px",
                class: "display-inline-block",
                formatter: (row, rows) => taskAddButton(row, rows),
              },
              {
                title: "할일",
                field: "task_title",
                type: "string",
                formatter: (row, rows) => titleComp(row, rows),
              },
              {
                title: "시작일",
                field: "task_start_desc",
                type: "string",
                width: "15%",
              },
              {
                title: "종료일",
                field: "task_end_desc",
                type: "string",
                width: "15%",
              },
              {
                title: "진행상태",
                field: "task_state",
                type: "string",
                width: "15%",
                class: "display-inline-block",
                formatter: (row, rows) => processComp(row, rows),
              },
              {
                title: "중요도",
                field: "task_important",
                type: "string",
                width: "10%",
                formatter: (row) => classImport(row),
              },
              {
                title: "담당자",
                field: "worker",
                type: "string",
                width: "10%",
                formatter: (row, rows) => workerComp(row, rows),
              },
            ]}
            options={options}
            id={"task_idx"}
            parentId={"upper_task_idx"}
          ></TreeList>
        </Module>
      )}
    </>
  );
}

export default ProjectTaskList;
