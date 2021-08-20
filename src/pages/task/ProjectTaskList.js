import React, { useEffect, useState } from "react";
import { Text, Box, Flex, IconButton } from "gestalt";
import MaterialTable from "material-table";
import { tableIcons } from "../../config/materialTable/materialTable";
import Add from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import Confirm from "../../component/common/Confirm";
import TaskForm from "../../component/task/TaskForm";
import TaskSubForm from "../../component/task/TaskSubForm";
import axios from "../../config/axios/axios";

const columns = [
  { title: "메인 할일", field: "name" },
  { title: "서브 할일", field: "surname" },
  { title: "시작일", field: "birthYear" },
  { title: "종료일", field: "birthCity" },
  { title: "진행상태", field: "sex" },
  { title: "중요도", field: "sex" },
  { title: "담당자", field: "type" },
];

function ProjectTaskList() {
  const project = useSelector((state) => state.project.project);

  const [isModal, setIsModal] = useState(false);
  const [isMain, setIsMain] = useState(false);

  const [taskList, setTaskList] = useState([
    {
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
    },
  ]);

  const [mainTaskIdx, setMainTaskIdx] = useState();

  const getTaskListAPI = () => {
    axios({
      method: "GET",
      url: "/task/list/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      setTaskList(result);
    });
  };

  useEffect(() => {
    console.log(project);
    //if (project) getTaskListAPI();
  }, [project]);

  const showMainTaskModal = () => {
    setIsMain(true);
    setIsModal(true);
  };
  const showSubTaskModal = (idx) => {
    setMainTaskIdx(idx);

    setIsMain(false);
    setIsModal(true);
  };

  return (
    <>
      {isModal ? (
        <Confirm
          size="lg"
          onDismiss={() => setIsModal(false)}
          contents={
            isMain ? (
              <TaskForm mode="Insert" onDismiss={() => setIsModal(false)} />
            ) : (
              <TaskSubForm
                mainTaskIdx={mainTaskIdx}
                mode="Insert"
                onDismiss={() => setIsModal(false)}
              />
            )
          }
          footer={<></>}
        />
      ) : (
        <></>
      )}
      <MaterialTable
        icons={tableIcons}
        title={
          <>
            <Flex justifyContent="center" alignContent="center">
              <IconButton
                icon="duplicate"
                size="md"
                accessibilityLabel="add"
                inline
                onClick={showMainTaskModal}
              />
              <Box marginTop={3}>
                <Text inline marginTop={2}>
                  &nbsp;할 일 목록
                </Text>
              </Box>
            </Flex>
          </>
        }
        data={taskList}
        columns={columns}
        parentChildData={(row, rows) => rows.find((a) => a.task_idx === row.upper_task_idx)}
        options={{
          search: false,
          paging: false,
        }}
        actions={[
          (rowData) => ({
            icon: Add,
            iconProps: { fontSize: "small" },
            tooltip: "서브 할일 추가",
            onClick: (event, rowData) => showSubTaskModal(rowData.id),
            hidden: rowData.parentId,
          }),
        ]}
      />
    </>
  );
}

export default ProjectTaskList;
