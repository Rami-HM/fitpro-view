import React, { useEffect, useState } from "react";
import { Box, IconButton, ScrollBoundaryContainer } from "gestalt";
import ProjectSheet from "./ProjectSheet";
import ProjectContents from "./ProjectContents";
import { useSelector } from "react-redux";
import ProjectInfo from "../../component/project/ProjectInfo";
import axios from "../../config/axios/axios";

//redux
import { useDispatch } from "react-redux";
import { actionCreators as projectAction } from "../../redux/modules/project";


function Project(props) {
  const [isProjectModal, setIsProjectModal] = useState(false);

  const projectList = useSelector((state) => state.project.projectList);
  const userSession = useSelector((state) => state.member.member);

  const dispatch = useDispatch();

  const onDismiss = () => {
    setIsProjectModal(false);
  };

  const getProjectListAPI = async () => {
    try {
      await axios({
        method: "GET",
        url: "/project/list/" + userSession.mem_idx,
      }).then((res) => {
        if (res.data.length > 0) {
          dispatch(projectAction.setProjectList(res.data));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isProjectModal ? (
        <ProjectSheet onDismiss={onDismiss} mode={"Insert"} />
      ) : (
        <Box column={12} display="flex">
          <Box column={3} minHeight="85vh">
            <Box column={12} paddingY={3} paddingX={5}>
              <IconButton
                accessibilityLabel="Open the settings page"
                onClick={() => setIsProjectModal(true)}
                icon="add"
                size="lg"
              />
            </Box>
            <Box column={12}>
              <ScrollBoundaryContainer height="80vh">
                <Box padding={5}>
                  {projectList.map((item, idx) => {
                    return (
                      <ProjectInfo
                        projectInfo={item}
                        key={item.prj_idx}
                        getProjectListAPI={getProjectListAPI}
                      />
                    );
                  })}
                </Box>
              </ScrollBoundaryContainer>
            </Box>
          </Box>
          <Box column={9} paddingX={5}>
            <div className={"ALa ho-"} style={{ height: "90%", padding: "3%" }}>
              <ScrollBoundaryContainer height="80vh">
                <ProjectContents/>
              </ScrollBoundaryContainer>
            </div>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Project;
