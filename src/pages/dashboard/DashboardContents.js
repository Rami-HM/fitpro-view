import React, { useEffect, useState } from "react";
import { Box, Text, Datapoint, Icon, Flex } from "gestalt";
import Progress from "../../component/dashboard/Progress";
import Chart from "../../component/dashboard/Chart";
import RecentTaskList from "../../component/dashboard/RecentTaskList";
import DashBoardInfo from "../../component/dashboard/DashBoardInfo";
import { DASHBOARD_CONT } from "../../config/constants/commonConts";

import {Tooltip} from '@material-ui/core'
import { Help } from '@material-ui/icons';

function DashboardContents(props) {

  return (
    <>
      <Box column={12} marginBottom={5}>
        <Box column={12} marginBottom={3}>
          <DashBoardInfo />
        </Box>
        <Box column={12}>
          <Progress />
        </Box>
      </Box>
      <Box column={12} marginBottom={5}>
        <Box column={12} marginBottom={3}>
          <Flex gap={2} alignContent="center">
            <Text size="sm" color="gray">
              프로젝트 대시보드
            </Text>
            <Tooltip title={DASHBOARD_CONT} placement="left-end">
              <Help color = "disabled" style={{ fontSize: 15}}/>
            </Tooltip>
          </Flex>
        </Box>
        <Box column={12} display="flex">
          <Chart />
        </Box>
      </Box>
      <Box column={12}>
        <Box column={12} display="flex">
          <RecentTaskList />
        </Box>
      </Box>
    </>
  );
}

export default DashboardContents;
