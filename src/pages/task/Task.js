import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Icon,
  TapArea,
  IconButton,
  SegmentedControl,
} from "gestalt";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import axios from "../../config/axios/axios";
import Alert from "../../component/common/Alert";
import { Select } from "@material-ui/core";

import { classImport, classState } from "../../util/common";

import { ALERT_TITLE } from "../../config/constants/commonConts";
import { Tooltip, TextField } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import TaskModal from "./TaskModal";

import { useDispatch } from "react-redux";
import { actionCreators as failAction } from "../../redux/modules/fail";

// 데이터 그리드 검색창 컴포넌트 (Material 제공)
function QuickSearchToolbar(props) {
  return (
    <Box column={12} display="flex" alignContent="end" justifyContent="end" padding={5}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
        }}
      />
    </Box>
  );
}

const defaultTask = {
  id: "0",
  task_idx: "",
  fail_idx: "",
  prj_idx: "",
  reg_date: "",
  reg_mem_idx: "",
  task_end: "",
  task_important: "",
  task_memo: "",
  task_start: "",
  task_state: "",
  task_headerName: "",
  upper_task_idx: "",
  upt_date: "",
  prj_title: "",
  main_title: "",
  task_state_desc: "",
  task_important_desc: "",
};

const stateLabel = [
  { label: "예정됨", value: "SH" },
  { label: "진행중", value: "PG" },
  { label: "보류", value: "PD" },
  { label: "완료됨", value: "CP" },
  { label: "미처리", value: "FL" },
];

function Task() {
  const userSession = useSelector((state) => state.member.member);

  const dispatch = useDispatch();

  const [taskList, setTaskList] = useState([defaultTask]);

  const [isAlert, setIsAlert] = useState(false);
  const [contents, setContents] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [taskIdx, setTaskIdx] = useState("");

  const [modalFlag, setModalFlag] = useState();

  const [itemIndex, setItemIndex] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([defaultTask]);

  useEffect(() => {
    setRows(taskList);
  }, [taskList]);

  const resetForm = () => {
    setIsAlert(false);
    setContents("");
    setModalFlag("");
    setIsModal(false);
  };

  // 모달창 오픈
  // flag : MAIN(form), SUB(form), VIEW
  // idx : task_idx : 존재할 경우 modify 로 취급
  const showModal = (flag) => (idx) => {
    resetForm();
    setTaskIdx(idx);
    setModalFlag(flag);
    setIsModal(true);
  };

  // 상태 코드를 Select(Material) 의 형태에 맞게 변경
  const stateSelectList = (params) => {
    const task = params.row;
    return (
      <Box maxWidth={130}>
        <Select
          value={task.task_state || "SH"}
          onChange={handleChangeState(task)}
        >
          {stateLabel.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </Select>
      </Box>
    );
  };

  // 할일 상태 변경 시 사용하는 state handle
  const handleChangeState = (task) => (e) => {
    const state = stateLabel.find((item) => item.value === e.target.value);
    const newTask = {
      ...task,
      task_state: state.value,
      task_state_desc: state.label,
    };
    if (state.value === "PD" || state.value === "FL") {
      setIsAlert(true);
      setContents(`${state.label} 는 사유와 함께 편집에서 변경 해 주세요!`);
      return;
    }
    modifyTaskStateAPI(newTask);
  };

  // search 정규식
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  // search 필터링
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = taskList.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };

  // 나에게 할당 된 테스크 목록 API
  // itemIndex > 0 : 서브할일, 1 : 메인할일
  const getMyTaskListAPI = () => {
    axios({
      method: "GET",
      url: "/task/list/" + userSession.mem_idx + "/" + itemIndex,
    }).then((res) => {
      const result = res.data.data;
      setTaskList(result);
    });
  };

  // 할일 상태 변경 API
  const modifyTaskStateAPI = (task) => {
    console.log(task);
    axios({
      method: "PATCH",
      url: "/task/modify/state/" + task.task_idx,
      data: { task_state: task.task_state },
    }).then((res) => {
      const newTaskList = taskList.map((item) => {
        return item.task_idx === task.task_idx ? task : item;
      });
      setTaskList(newTaskList);
    });
  };

  // 미처리 및 보류 사유 목록 API
  // redux에 FailReason 으로 저장
  const getFailReasonAPI = async () => {
    axios({
      method: "GET",
      url: "/fail/reason",
    }).then((res) => {
      const result = res.data.data;
      const formatReason = result.map((item) => {
        return {
          label: item.fail_contents,
          value: item.fail_idx.toString(),
        };
      });

      dispatch(
        failAction.setFailReason([
          { label: "-", value: "-" },
          ...formatReason,
          { label: "직접 입력", value: "add" },
        ])
      );
    });
  };

  useEffect(() => {
    getFailReasonAPI();
  }, []);

  useEffect(() => {
    if (userSession.hasOwnProperty("mem_idx")) getMyTaskListAPI();
  }, [userSession, itemIndex]);

  // itemIndex = 1 (메인 할일) 일 때 데이터그리드 컬럼 값
  const mainColumns = [
    {
      field: "task_idx",
      headerName: " ",
      flex: 0.3,
      minWidth: 50,
      type: "string",
      renderCell: (params) => {
        return (
          <>
            <IconButton
              accessibilityLabel="task Edit"
              icon="edit"
              size="xs"
              inline
              onClick={() =>
                showModal(params.row.upper_task_idx ? "SUB" : "MAIN")(
                  params.row.task_idx
                )
              }
            />
            <IconButton
              accessibilityLabel="delete Edit"
              icon="trash-can"
              size="xs"
              inline
              onClick={() => showModal("DELETE")(params.row.task_idx)}
            />
          </>
        );
      },
    },
    {
      field: "prj_title",
      headerName: (
        <Text inline size="md" weight="bold">
          프로젝트명
        </Text>
      ),
      type: "string",
      flex: 0.9,
      minWidth: 200,
    },
    {
      field: "task_title",
      renderHeader: () => (
        <Box display="flex">
          <Text inline size="md" weight="bold">
            메인할일
          </Text>
          <Tooltip
            inline
            title="메인 할일 추가"
            text="메인 할일 추가"
            idealDirection="down"
          >
            <IconButton
              icon="duplicate"
              size="md"
              accessibilityLabel="add"
              inline
              onClick={() => showModal("MAIN")()}
            />
          </Tooltip>
        </Box>
      ),
      type: "string",
      flex: 1,
      minWidth: 240,
      editable: false,
      renderCell: (params) => {
        return (
          <TapArea onTap={() => showModal("VIEW")(params.row.task_idx)}>
            <Box display="flex" justifyContent="start" alignContent="center">
              {params.row.task_title}
            </Box>
          </TapArea>
        );
      },
    },
    {
      field: "task_start",
      headerName: (
        <Text inline size="md" weight="bold">
          시작일
        </Text>
      ),
      type: "dateTime",
      flex: 0.7,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <TextField
            className="fs-09em"
            size="small"
            id="task_start"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => {}}
            value={params.row.task_start}
            disabled
          />
        );
      },
    },
    {
      headerName: (
        <Text inline size="md" weight="bold">
          종료일
        </Text>
      ),
      field: "task_end",
      type: "dateTime",
      flex: 0.7,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <TextField
            className="fs-09em"
            size="small"
            id="task_end"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => {}}
            value={params.row.task_end}
            disabled
          />
        );
      },
    },
  ];

  // itemIndex = 0 (서브 할일) 일 때 데이터그리드 컬럼 값
  const subColumns = [
    {
      field: "task_idx",
      headerName: " ",
      flex: 0.3,
      minWidth: 50,
      type: "string",
      renderCell: (params) => {
        return (
          <>
            <IconButton
              accessibilityLabel="task Edit"
              icon="edit"
              size="xs"
              inline
              onClick={() =>
                showModal(params.row.upper_task_idx ? "SUB" : "MAIN")(
                  params.row.task_idx
                )
              }
            />
            <IconButton
              accessibilityLabel="delete Edit"
              icon="trash-can"
              size="xs"
              inline
              onClick={() => showModal("DELETE")(params.row.task_idx)}
            />
          </>
        );
      },
    },
    {
      field: "prj_title",
      headerName: (
        <Text inline size="md" weight="bold">
          프로젝트명
        </Text>
      ),
      type: "string",
      flex: 0.9,
      minWidth: 200,
    },
    {
      field: "main_task",
      renderHeader: () => (
        <Box display="flex">
          <Text inline size="md" weight="bold">
            메인할일
          </Text>
          <Tooltip
            inline
            title="메인 할일 추가"
            text="메인 할일 추가"
            idealDirection="down"
          >
            <IconButton
              icon="duplicate"
              size="md"
              accessibilityLabel="add"
              inline
              onClick={() => showModal("MAIN")()}
            />
          </Tooltip>
        </Box>
      ),
      type: "string",
      flex: 1,
      minWidth: 240,
      editable: false,
    },
    {
      field: "task_title",
      renderHeader: () => (
        <Box display="flex">
          <Text inline size="md" weight="bold">
            할일
          </Text>
          <Tooltip
            inline
            title="서브 할일 추가"
            text="서브 할일 추가"
            idealDirection="down"
          >
            <IconButton
              icon="add"
              size="md"
              accessibilityLabel="add"
              inline
              onClick={() => showModal("SUB")()}
            />
          </Tooltip>
        </Box>
      ),
      type: "string",
      flex: 1,
      minWidth: 260,
      editable: false,
      renderCell: (params) => {
        return (
          <TapArea onTap={() => showModal("VIEW")(params.row.task_idx)}>
            <Box display="flex" justifyContent="start" alignContent="center">
              {params.row.task_title}
            </Box>
          </TapArea>
        );
      },
    },
    {
      field: "task_start",
      headerName: (
        <Text inline size="md" weight="bold">
          시작일
        </Text>
      ),
      type: "dateTime",
      flex: 0.7,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <TextField
            className="fs-09em"
            size="small"
            id="task_start"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => {}}
            value={params.row.task_start}
            disabled
          />
        );
      },
    },
    {
      headerName: (
        <Text inline size="md" weight="bold">
          종료일
        </Text>
      ),
      field: "task_end",
      type: "dateTime",
      flex: 0.7,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <TextField
            className="fs-09em"
            size="small"
            id="task_end"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => {}}
            value={params.row.task_end}
            disabled
          />
        );
      },
    },
    {
      headerName: (
        <Text inline size="md" weight="bold">
          상태
        </Text>
      ),
      field: "task_state_desc",
      type: "string",
      flex: 0.4,
      width: 150,
      editable: true,
      renderEditCell: (params) => stateSelectList(params),
      renderCell: (params) => classState(params.row.task_state),
    },
    {
      headerName: (
        <Text inline size="md" weight="bold">
          중요도
        </Text>
      ),
      field: "task_important_desc",
      type: "string",
      flex: 0.4,
      width: 150,
      editable: false,
      renderCell: (params) => classImport(params.row.task_important_desc),
    },
  ];
  return (
    <>
      {isAlert ? (
        <Alert
          onDismiss={() => setIsAlert(false)}
          title={ALERT_TITLE}
          contents={contents}
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
          itemIndex={itemIndex}
        />
      ) : (
        <>
          <Box column={12} marginBottom={3}>
            <Icon icon="angled-pin" inline accessibilityLabel="angled-pin" />
            &nbsp;
            <Text inline size="md" color="darkGray">
              내 할일
            </Text>
          </Box>
          <Box column={12} marginBottom={3}>
            <SegmentedControl
              items={["Sub", "Main"]}
              selectedItemIndex={itemIndex}
              onChange={({ activeIndex }) => {
                setItemIndex(activeIndex);
              }}
            />
          </Box>
          <Box column={12} marginBottom={3} height="80vh">
            <DataGrid
              components={{ Toolbar: QuickSearchToolbar }}
              rows={rows}
              columns={itemIndex === 0 ? subColumns : mainColumns}
              pageSize={12}
              disableColumnMenu
              rowsPerPageOptions={[12]}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  onChange: (event) => requestSearch(event.target.value),
                  clearSearch: () => requestSearch(""),
                },
              }}
            />
          </Box>
        </>
      )}
    </>
  );
}

export default Task;
