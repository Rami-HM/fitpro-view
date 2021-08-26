import React, { useState, useEffect } from "react";
import DashboardContents from "./DashboardContents";
import { Box } from "gestalt";
import ProjectSelectList from "../../component/project/ProjectSelectList";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as projectAction } from "../../redux/modules/project";

function DashboardTitle() {
  const dispatch = useDispatch();

  // 해당 프로젝트를 redux 저장
  const projectDetail = async (project) => {
    try {
      dispatch(projectAction.getProject(Number(project.value)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box column={12} marginBottom={5}>
        <ProjectSelectList handleSelect={projectDetail} />
      </Box>
      <DashboardContents />
    </>
  );
}

export default DashboardTitle;
