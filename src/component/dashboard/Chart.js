import React from "react";

import { Box, Module, Text, Table } from "gestalt";
import DoughnutChart from "./chart/DoughnutChart";
import BarChart from "./chart/BarChart";
import TotalNum from "./chart/TotalNum";
import AssignStats from "./chart/AssignStats";
import MainTaskCntStats from "./chart/MainTaskCntStats";

function Chart() {
  return (
    <>
      <Box column={3} marginEnd={5}>
        <TotalNum />
        <div className="hgt-100 hgt-84-chd">
          <Module>
            <DoughnutChart />
          </Module>
        </div>
      </Box>
      <Box column={4} marginEnd={5}>
        <Box marginBottom={5}>
          <Module>
            <AssignStats />
          </Module>
        </Box>
        <Box>
          <Module>
            <MainTaskCntStats />
          </Module>
        </Box>
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
