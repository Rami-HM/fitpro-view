import React, { useEffect, useState } from "react";
import { Box, Module } from "gestalt";
import ProjectSelectList from "../../component/project/ProjectSelectList";
import { Collapse } from "@material-ui/core";
import axios from "../../config/axios/axios";
import ProjectView from "./ProjectView";
import ProjectTaskList from "./ProjectTaskList";

//material 사용시 나오는 warning(findDOMNode is deprecated in StrictMode.) 해결
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { actionCreators as projectAction } from "../../redux/modules/project";
import { actionCreators as failAction } from "../../redux/modules/fail";

function ProjectTask() {
  const theme = unstable_createMuiStrictModeTheme();
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const projectDetail = async (project) => {
    try {
      dispatch(projectAction.getProject(Number(project.value)));
    } catch (error) {
      console.log(error);
    }
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

  useEffect(()=>{
    getFailReasonAPI();
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Box column={12} marginBottom={3}>
        <ProjectSelectList handleSelect={projectDetail} />
      </Box>
      <Box column={12} marginBottom={5} minHeight={50}>
        <Collapse in={checked} collapsedSize={50}>
          <ProjectView checked={checked} setChecked={setChecked} />
        </Collapse>
      </Box>
      <Box column={12} marginBottom={5} minHeight="60vh">
        <ProjectTaskList />
      </Box>
    </ThemeProvider>
  );
}

export default ProjectTask;
