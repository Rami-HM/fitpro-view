import React, { useEffect, useState } from "react";
import { Box, IconButton, ScrollBoundaryContainer } from "gestalt";
import ProjectSheet from "./ProjectSheet";
import ProjectContents from "./ProjectContents";
import { useSelector } from "react-redux";
import ProjectInfo from "../../component/project/ProjectInfo";
import axios from "../../config/axios/axios";

//redux
import { useDispatch } from "react-redux";
import { actionCreators as memberAction } from "../../redux/modules/member";


function Project(props) {
  const [isProjectModal, setIsProjectModal] = useState(false);

  const projectList = useSelector((state) => state.project.projectList);

  const dispatch = useDispatch();

  useEffect(()=>{
    getTotMemberListAPI();
  },[])

  const onDismiss = () => {
    setIsProjectModal(false);
  };

  const getTotMemberListAPI = async() =>{
      axios({
        method: "GET",
        url: "/member/list",
      }).then((res) => {
        const totmemberList = res.data;
        dispatch(memberAction.setTotMember(totmemberList));
      });
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
                  {projectList.map((item) => {
                    return (
                      <ProjectInfo
                        projectInfo={item}
                        key={item.prj_idx}
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
