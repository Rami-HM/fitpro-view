import React, { useEffect, useState } from "react";
import { Box, Module, Text, TapArea } from "gestalt";
import axios from "../../../config/axios/axios";
import { useSelector } from "react-redux";
import { redirect } from "../../../util/router";
import { useHistory } from "react-router";

function TotalNum(props) {
  const history = useHistory();
  const project = useSelector((state) => state.project.project);

  const [totTaskStats, setTotTaskStats] = useState([]);

  const getTotalTaskStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/total/task/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      setTotTaskStats(result);
    });
  };

  const moveProjectTask = () => {
    history.push({ pathname: "/project/task" });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      getTotalTaskStatsAPI();
    }
  }, [project]);

  const cardView = () => {
    return (
      <Box>
        <Box column={12} marginBottom={5}>
          <TapArea onTap={moveProjectTask}>
            <Module>
              <Box display="flex">
                <Box column={4}>
                  <Text size="sm" weight="bold">
                    총 할일
                  </Text>
                    <Text size="sm">
                      {totTaskStats.main_task_cnt + totTaskStats.sub_task_cnt} 건
                    </Text>
                </Box>
                <Box column={4}>
                  <Text size="sm" weight="bold">
                    메인 할일
                  </Text>
                  <Text size="sm">{totTaskStats.main_task_cnt} 건</Text>
                </Box>
                <Box column={4}>
                  <Text size="sm" weight="bold">
                    서브 할일
                  </Text>
                  <Text size="sm">{totTaskStats.sub_task_cnt} 건</Text>
                </Box>
              </Box>
            </Module>
          </TapArea>
        </Box>
      </Box>
    );
  };

  return <>{cardView()}</>;
}

export default TotalNum;
