import React, { useEffect, useState } from "react";
import { Box, IconButton, ScrollBoundaryContainer } from "gestalt";
import { useSelector } from "react-redux";
import ProjectInfo from "../../component/project/ProjectInfo";
import CalnedarContents from "./CalnedarContents";

function Calendar() {
  const projectList = useSelector((state) => state.project.projectList);

  useEffect(() => {}, []);

  return (
    <>
        <Box display="flex">
      <Box column={3} minHeight="85vh">
        <Box column={12}>
          <ScrollBoundaryContainer height="80vh">
            <Box padding={5}>
              {projectList.map((item) => {
                return <ProjectInfo projectInfo={item} key={item.prj_idx} readonly />;
              })}
            </Box>
          </ScrollBoundaryContainer>
        </Box>
      </Box>
      <Box column={9} marginStart={2}>
        <div className={"ALa ho-"} style={{ height: "90%", padding: "3%" }}>
          <CalnedarContents/>
        </div>
      </Box>
      </Box>
    </>
  );
}

export default Calendar;
