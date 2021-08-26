import React from "react";

import { Box, Module, Text, Flex } from "gestalt";
import DoughnutChart from "./chart/DoughnutChart";
import BarChart from "./chart/BarChart";
import TotalNum from './chart/TotalNum';

function Chart() {
  return (
    <>
      <Box column={4} marginEnd={5}>
          <TotalNum />
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
