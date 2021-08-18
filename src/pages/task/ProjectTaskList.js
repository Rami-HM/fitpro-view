import React, { useEffect, useState } from "react";
import { Text, Box, Flex, IconButton } from "gestalt";
import MaterialTable from "material-table";
import { tableIcons } from "../../config/materialTable/materialTable";
import Add from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import Confirm from "../../component/common/Confirm";
import TaskForm from "../../component/task/TaskForm";
import TaskSubForm from "../../component/task/TaskSubForm";

const data = [
  {
    id: 1,
    name: "a",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 63,
    sex: "Male",
    type: "adult",
  },
  {
    id: 2,
    name: "b",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 34,
    sex: "Female",
    type: "adult",
    parentId: 1,
  },
  {
    id: 3,
    name: "c",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 34,
    sex: "Female",
    type: "child",
    parentId: 1,
  },
  {
    id: 5,
    name: "e",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 34,
    sex: "Female",
    type: "child",
  },
  {
    id: 6,
    name: "",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 34,
    sex: "Female",
    type: "child",
    parentId: 5,
  },
];

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

  useEffect(() => {
  }, [isModal]);

  const showMainTaskModal = () => {
    setIsMain(true);
    setIsModal(true);
  };
  const showSubTaskModal = () => {
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
              <TaskSubForm mode="Insert" onDismiss={() => setIsModal(false)} />
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
        data={data}
        columns={columns}
        parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
        options={{
          search: false,
          paging: false,
        }}
        actions={[
          (rowData) => ({
            icon: Add,
            iconProps: { fontSize: "small" },
            tooltip: "서브 할일 추가",
            onClick: showSubTaskModal,
            hidden: rowData.parentId,
          }),
        ]}
      />
    </>
  );
}

export default ProjectTaskList;
