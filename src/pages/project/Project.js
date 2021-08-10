import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  ScrollBoundaryContainer,
  Text,
  TapArea,
} from "gestalt";
import ProjectSheet from "./ProjectSheet";
//import ProjectList from "./ProjectList";
import ProjectContents from "./ProjectContents";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
function Project() {
  const [projectId, setProjectId] = useState(0);
  const [isProjectModal, setIsProjectModal] = useState(false);

  const onDismiss = () => {
    setIsProjectModal(false);
  };

  const [projectInfo, setProjectInfo] = useState([]);
  const changeProjectContents = (id) => {
    setProjectId(id);
  };

  useEffect(() => {
    projectListAPI();
  }, []);

  const projectListAPI = () => {
    setTimeout(() => {
      setProjectInfo([
        {
          bookmark: true,
          projectId: "1",
          projectName: "projectName1",
        },
        {
          bookmark: false,
          projectId: "2",
          projectName: "projectName2",
        },
        {
          bookmark: false,
          projectId: "3",
          projectName: "projectName3",
        },
        {
          bookmark: false,
          projectId: "4",
          projectName: "projectName4",
        },
      ]);
    }, 1000);
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
                  {projectInfo.map((item, idx) => {
                    return (
                      <div
                        className={item.projectId === projectId ? "list-selected" : ""}
                        key={item.projectId}
                      >
                        <Box rounding={4} marginBottom={5}>
                          <div className={"ALa ho-"}>
                            <TapArea
                              rounding={4}
                              onTap={() =>
                                changeProjectContents(item.projectId)
                              }
                            >
                              <Box
                                alignItems="center"
                                display="flex"
                                padding={3}
                              >
                                <Box column={2}>
                                  {item.bookmark ? (
                                    <StarIcon style={{ color: "orange" }} />
                                  ) : (
                                    <StarOutlineIcon
                                      style={{ color: "gray" }}
                                    />
                                  )}
                                </Box>
                                <Box column={10}>
                                  <Text weight="bold">{item.projectName}</Text>
                                </Box>
                              </Box>
                            </TapArea>
                          </div>
                        </Box>
                      </div>
                    );
                  })}
                </Box>
              </ScrollBoundaryContainer>
            </Box>
          </Box>
          <Box column={9} paddingX={5}>
            <div className={"ALa ho-"} style={{ height: "90%", padding: "3%" }}>
              <ScrollBoundaryContainer height="80vh">
                <ProjectContents projectId={projectId} />
              </ScrollBoundaryContainer>
            </div>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Project;
