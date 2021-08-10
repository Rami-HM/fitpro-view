import React from "react";
import { Box, Sheet } from "gestalt";
import ProjectForm from "../../component/project/ProjectForm";

function ProjectModal(props) {
  const { onDismiss, mode } = props;

  return (
    <Sheet
      accessibilityDismissButtonLabel="Close sheet"
      accessibilitySheetLabel="reation for new one"
      heading={
        {
          Insert: '추가중입니다?',
          Modify: '수정중입니다..',
        }[mode]
      }
      onDismiss={onDismiss}
      size="lg"
    >
      <Box paddingX={8}>
        {
          {
            Insert: <ProjectForm mode={mode} />,
            Modify: <ProjectForm mode={mode} />,
          }[mode]
        }
      </Box>
    </Sheet>
  );
}

export default ProjectModal;
