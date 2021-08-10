import React, { useEffect, useState } from "react";
import { Box, PageHeader, Text, Datapoint, Icon } from "gestalt";
import Progress from "../../component/dashboard/Progress";
import Chart from "../../component/dashboard/Chart";
import DataList from "../../component/dashboard/Datalist";

function DashboardContents(props) {

  const {project} = props;

  return (
    <>
      <Box column={12} marginBottom={5} >
        <Box column={12} marginBottom={3}>
          <Datapoint size="md" title={`${project.startDate} ~ ${project.endDate}`} value="1Day" />
        </Box>
        <Box column={12}>
          <Progress/>
        </Box>
      </Box>
      <Box column={12} marginBottom={5} >
        <Box column={12} marginBottom={1}>
          <Text size = "sm" color="gray">프로젝트 대시보드</Text>
        </Box>
        <Box column={12} display="flex">
          <Chart/>
        </Box>
      </Box>
      <Box column={12}>
        <Box column={12} marginBottom={1}>
          <Text size = "sm" color="gray">해야할 일</Text>
        </Box>
        <Box column={12} display="flex">
          <DataList />
        </Box>
      </Box>
    </>
  );
}

export default DashboardContents;
