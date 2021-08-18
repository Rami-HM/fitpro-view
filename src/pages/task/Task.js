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

function Task() {
  const theme = unstable_createMuiStrictModeTheme();

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const projectDetail = async (project) => {
    console.log(project);
    try {
      dispatch(projectAction.getProject(Number(project.value)));
      setChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box column={12} marginBottom={3}>
        <ProjectSelectList handleSelect={projectDetail} />
      </Box>
      <Box column={12} marginBottom={5} minHeight={50}>
        <Collapse in={checked} collapsedSize={50}>
          <TaskProject checked={checked} setChecked={setChecked} />
        </Collapse>
      </Box>
      <Box column={12} marginBottom={5} minHeight="60vh">
        <ProjectTaskList />
      </Box>
    </ThemeProvider>
  );
}

export default Task;
