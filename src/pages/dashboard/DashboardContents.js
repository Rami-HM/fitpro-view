import React, { useEffect, useState } from "react";
import { Box, Text, Datapoint, Icon, Flex } from "gestalt";
import Progress from "../../component/dashboard/Progress";
import Chart from "../../component/dashboard/Chart";
import DataList from "../../component/dashboard/Datalist";
import { useSelector } from "react-redux";
import ProjcetStatus from "../../component/common/ProjcetStatus";
import { DASHBOARD_CONT } from "../../config/constants/commonConts";

import {Tooltip} from '@material-ui/core'
import { Help } from '@material-ui/icons';

function DashboardContents(props) {
  const project = useSelector((state) => state.project.project);
  const [lastDay, setLastDay] = useState("0");

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      let dDay =
        (new Date(project.prj_end).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24);
      if (dDay < 0) dDay = 0;
      setLastDay(Math.round(dDay));
    }
  }, [project]);

  return (
    <>
      <Box column={12} marginBottom={5}>
        <Box column={12} marginBottom={3}>
          <Datapoint
            size="md"
            title={`${project.prj_start} ~ ${project.prj_end}`}
            value={
              <>
                <Box display="flex">
                  {`${lastDay}Day `}
                  <Box paddingX={5}>
                    <ProjcetStatus />
                  </Box>
                </Box>
              </>
            }
          />
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
        <Box column={12} marginBottom={1}>
          <Text size="sm" color="gray">
            해야할 일
          </Text>
        </Box>
        <Box column={12} display="flex">
          <DataList />
        </Box>
      </Box>
    </>
  );
}

export default DashboardContents;
