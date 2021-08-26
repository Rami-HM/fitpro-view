import React from "react";
import { Box, Flex, Text, Status, IconButton, Divider } from "gestalt";
import { Viewer } from "@toast-ui/react-editor";

import { useSelector } from "react-redux";

import ProjcetStatus from "../../component/common/ProjcetStatus";

function ProjectView(props) {
  const { checked, setChecked } = props;
  const project = useSelector((state) => state.project.project);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={3}
        width="100%"
        minHeight={50}
      >
        <Flex.Item flex="grow">
          <Box marginStart={4}>
            <Flex>
              <Flex.Item>
                <Text size="lg">{project.prj_sub_title} </Text>
                <Box marginTop={1}>
                  <Text size="sm">
                    {project.prj_start} ~ {project.prj_end}
                  </Text>
                </Box>
              </Flex.Item>
              <Flex.Item>
                <Box marginStart={4}>
                  <ProjcetStatus />
                </Box>
              </Flex.Item>
            </Flex>
          </Box>
        </Flex.Item>
        <Flex.Item>
          <IconButton
            accessibilityLabel="Open the settings page"
            icon={checked ? "arrow-up" : "arrow-down"}
            size="md"
            onClick={handleChange}
          />
        </Flex.Item>
      </Flex>
      <Box padding={3} minHeight={50}>
        {checked ? (
          <>
            <Divider />
            <Viewer initialValue={project.prj_contents} />
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default ProjectView;
