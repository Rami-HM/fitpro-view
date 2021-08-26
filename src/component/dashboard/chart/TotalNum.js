import React from "react";
import { Box, Module, Text, Flex } from "gestalt";

function TotalNum() {
  return (
    <>
      <Flex direction="column" gap={5}>
        <Module>
          <Box display="flex">
            <Box column={6}>
              <Text size="md">예정됨</Text>
            </Box>
            <Box column={6}>
              <Text size="md">10</Text>
            </Box>
          </Box>
        </Module>
        <Module>
          <Box display="flex">
            <Box column={6}>
              <Text size="md">진행중</Text>
            </Box>
            <Box column={6} alignItems="end">
              <Text size="md">5</Text>
            </Box>
          </Box>
        </Module>
        <Module>
          <Box display="flex">
            <Box column={6}>
              <Text size="md">완료됨</Text>
            </Box>
            <Box column={6}>
              <Text size="md">40</Text>
            </Box>
          </Box>
        </Module>
        <Module>
          <Box display="flex">
            <Box column={6}>
              <Text size="md">보류/미처리</Text>
            </Box>
            <Box column={6}>
              <Text size="md">3</Text>
            </Box>
          </Box>
        </Module>
      </Flex>
    </>
  );
}

export default TotalNum;
