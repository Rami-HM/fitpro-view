import React, { useState } from "react";
import { Box, Module } from "gestalt";
import ProjectSelectList from "../../component/project/ProjectSelectList";
import { Collapse } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "../../config/axios/axios";
import TaskProject from "./TaskProject";
import ProjectTaskList from "./ProjectTaskList";

//material 사용시 나오는 warning(findDOMNode is deprecated in StrictMode.) 해결
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { actionCreators as projectAction } from "../../redux/modules/project";
import ProjcetStatus from "../../component/common/ProjcetStatus";

function Task() {
  const theme = unstable_createMuiStrictModeTheme();

  const [checked, setChecked] = useState(false);

  const userSession = useSelector((state) => state.member.member);
  const dispatch = useDispatch();

  const projectDetailAPI = async (selected) => {
    try {
      await axios({
        method: "GET",
        url: "/project/detail/" + selected.value + "/" + userSession.mem_idx,
      }).then((res) => {
        const newProject = res.data;
        dispatch(projectAction.setProject(newProject));
        setChecked(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box column={12} marginBottom={3}>
        <ProjectSelectList handleSelect={projectDetailAPI} />
      </Box>
      <Box column={12} marginBottom={5} minHeight={50}>
        <Collapse in={checked} collapsedSize={50}>
          <TaskProject checked={checked} setChecked={setChecked} />
        </Collapse>
      </Box>
      <Box column={12} marginBottom={5} minHeight="60vh">
        <Module
          icon="angled-pin"
          iconAccessibilityLabel="taskList"
          id="taskList"
          title="할 일 목록"
        >
          <ProjectTaskList />
        </Module>
      </Box>
    </ThemeProvider>
  );
}

export default Task;
