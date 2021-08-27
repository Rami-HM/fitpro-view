import React, { useEffect, useState } from "react";
import { Box, Module, Text, Flex } from "gestalt";
import axios from "../../../config/axios/axios";
import { useSelector } from "react-redux";

function TotalNum() {
  const project = useSelector((state) => state.project.project);

  const [totStats, setTotStats] = useState([]);
  const [totTaskStats, setTotTaskStats] = useState([]);

  const getTotalStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/total/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      console.log(result);
      setTotStats(result);
    });
  };

  const getTotalTaskStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/total/task/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      console.log(result);
      setTotTaskStats(result);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      getTotalStatsAPI();
      getTotalTaskStatsAPI();
    }
  }, [project]);

  const cardView = () => {
    if (totStats.length > 0)
      return (
        <Box>
          <Box column={12} marginBottom={5}>
            <Module>
              <Box display="flex">
                <Box column={4}>
                  <Text size="sm">총 할일 </Text>
                  <Text size="lg">{totTaskStats.main_task_cnt + totTaskStats.sub_task_cnt} 건</Text>
                </Box>
                <Box column={4}>
                  <Text size="sm">메인 할일 </Text>
                  <Text size="lg">{totTaskStats.main_task_cnt} 건</Text>
                </Box>
                <Box column={4}>
                  <Text size="sm">서브 할일 </Text>
                  <Text size="lg">{totTaskStats.sub_task_cnt} 건</Text>
                </Box>
              </Box>
            </Module>
          </Box>
          <Box column={12} display="flex" marginBottom={5}>
            <Box column={6} marginEnd={5}>
              <div className="hgt-100-chd hgt-100">
                <Module>
                  <Box display="flex" higth="100%">
                    <Box column={6}>
                      <Text size="md">{totStats[0].task_state_desc}</Text>
                    </Box>
                    <Box column={6}>
                      <Text size="md">{totStats[0].cnt} 건</Text>
                    </Box>
                  </Box>
                </Module>
              </div>
            </Box>
            <Box column={6}>
              <Box marginBottom={5}>
                <Module>
                  <Box display="flex">
                    <Box column={6}>
                      <Text size="md">{totStats[1].task_state_desc}</Text>
                    </Box>
                    <Box column={6}>
                      <Text size="md">{totStats[1].cnt} 건</Text>
                    </Box>
                  </Box>
                </Module>
              </Box>
              <Box>
                <Module>
                  <Box display="flex">
                    <Box column={6}>
                      <Text size="md">{totStats[2].task_state_desc}</Text>
                    </Box>
                    <Box column={6}>
                      <Text size="md">{totStats[2].cnt} 건</Text>
                    </Box>
                  </Box>
                </Module>
              </Box>
            </Box>
          </Box>
          <Box column={12} marginBottom={5} display="flex">
            <Box column={6} marginEnd={5}>
              <Module>
                <Box display="flex" higth="100%">
                  <Box column={6}>
                    <Text size="md">{totStats[3].task_state_desc}</Text>
                  </Box>
                  <Box column={6}>
                    <Text size="md">{totStats[3].cnt} 건</Text>
                  </Box>
                </Box>
              </Module>
            </Box>
            <Box column={6}>
              <Module>
                <Box display="flex" higth="100%">
                  <Box column={6}>
                    <Text size="md">{totStats[4].task_state_desc}</Text>
                  </Box>
                  <Box column={6}>
                    <Text size="md">{totStats[4].cnt} 건</Text>
                  </Box>
                </Box>
              </Module>
            </Box>
          </Box>
        </Box>
      );
  };

  return (
    <>
      {cardView()}
    </>
  );
}

export default TotalNum;
