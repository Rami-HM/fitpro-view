import React from "react";

import { Box, Module, Text, Flex } from "gestalt";
import DoughnutChart from "./chart/DoughnutChart";
import BarChart from "./chart/BarChart";

function Chart() {
  return (
    <>
      <Box column={4} marginEnd={5}>
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
      </Box>
      <Box column={3} marginEnd={5}>
        <div className="hgt-100 hgt-100-chd">
          <Module>
            <DoughnutChart />
          </Module>
        </div>
      </Box>
      <Box column={5}>
        <div className="hgt-100 hgt-100-chd">
          <Module>
            <BarChart />
          </Module>
        </div>
      </Box>
    </>
  );
}

export default Chart;
