import React from "react";

import TaskForm from "../../component/task/TaskForm";
import TaskView from "../../component/task/TaskView";
import Confirm from "../../component/common/Confirm";
import axios from "../../config/axios/axios";
import {
  DELETE_CONTENTS,
  DELETE_TITLE,
} from "../../config/constants/commonConts";

function TaskModal(props) {
  const {
    taskIdx,
    modalFlag,
    setIsModal,
    taskList,
    setTaskList,
    resetForm,
    upperTaskIdx,
    itemIndex,
  } = props;

  // 할일 삭제 API
  const deleteTaskAPI = async () => {
    await axios({
      method: "DELETE",
      url: "/task/delete/" + taskIdx,
    }).then((res) => {
      alert(res.data.message);
      resetForm();
      const newTaskList = taskList.filter((item) => item.task_idx !== taskIdx);
      setTaskList(newTaskList);
    });
  };

  const componentSwitch = () => {
    switch (modalFlag) {
      case "VIEW": // 메인 할일 추가 및 수정
        return (
          <TaskView taskIdx={taskIdx} onDismiss={() => setIsModal(false)} />
        );
      default:
        return (
          <TaskForm
            taskIdx={taskIdx}
            mode={taskIdx ? "Modify" : "Insert"}
            onDismiss={() => setIsModal(false)}
            taskList={taskList}
            setTaskList={setTaskList}
            modalFlag={modalFlag}
            upperTaskIdx={upperTaskIdx} // upperTaskIdx 가 없을 경우 메인 할일로 취급
            itemIndex={itemIndex}
          />
        );
    }
  };

  return (
    <>
      {modalFlag === "DELETE" ? (
        <Confirm
          size="sm"
          onDismiss={() => setIsModal(false)}
          contents={DELETE_CONTENTS}
          title={DELETE_TITLE}
          onClick={deleteTaskAPI}
        />
      ) : (
        <Confirm
          size="lg"
          onDismiss={() => setIsModal(false)}
          contents={componentSwitch()}
          footer
        />
      )}
    </>
  );
}

export default TaskModal;
