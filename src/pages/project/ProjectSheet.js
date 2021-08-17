import React from "react";
import { Box, Sheet } from "gestalt";
import ProjectForm from "../../component/project/ProjectForm";
import { useSelector } from "react-redux";

function ProjectModal(props) {

  const project = useSelector(state=>state.project.project);

  const { onDismiss, mode } = props;

  return (
    <Sheet
      accessibilityDismissButtonLabel="Close sheet"
      accessibilitySheetLabel="reation for new one"
      heading={
        {
          Insert: '프로젝트를 추가해보세요!',
          Modify: `${project.prj_title}`,
        }[mode]
      }
      onDismiss={onDismiss}
      size="lg"
    >
      <Box paddingX={8}>
        {
          {
            Insert: <ProjectForm onDismiss = {onDismiss} mode={mode} />,
            Modify: <ProjectForm onDismiss = {onDismiss} mode={mode} />,
          }[mode]
        }
      </Box>
    </Sheet>
  );
}

export default ProjectModal;
