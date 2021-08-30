import React, { useEffect, useState } from "react";
import { Text, Table, Box } from "gestalt";
import { MAINTASKCNT_DESC } from "../../../config/constants/commonConts";
import { Tooltip } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import axios from "../../../config/axios/axios";
import { useSelector } from "react-redux";
import randomColor from "randomcolor";

function MainTaskCntStats() {
  const [mainTaskStatsList, setMainTaskStatsList] = useState([]);
  const project = useSelector((state) => state.project.project);

  const getMainTaskCntStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/main/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      setMainTaskStatsList(result);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      getMainTaskCntStatsAPI();
    }
  }, [project]);

  return (
    <>
      <Box height={220}>
        <Text size="sm" color="gray">
          메인 할일 별 할당 된 할일 통계 &nbsp;
          <Tooltip title={MAINTASKCNT_DESC} placement="right-end">
            <Help color="disabled" style={{ fontSize: 15 }} />
          </Tooltip>
        </Text>
        <Table maxHeight={200}>
          <Table.Header sticky>
            <Table.Row>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    메인 할일
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    전체건수
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    완료건수
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    처리율
                  </Text>
                </Box>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mainTaskStatsList.map((item) => {
              const color = randomColor({
                luminosity: "light",
                hue: "blue",
              });
              const percent = Math.round(
                (item.comple_cnt /
                  (item.total_cnt === 0 ? 1 : item.total_cnt)) *
                  100
              );
              return (
                <Table.Row key={item.task_idx}>
                  <Table.Cell>
                    <Box>
                      <Text size="md" weight="bold">{item.task_title}</Text>
                      <Text size="sm">{item.task_memo}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box>
                      <Text size="lg">{item.total_cnt} 건</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box>
                      <Text size="lg">{item.comple_cnt} 건</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box>
                      <div
                        style={{
                          width: "100%",
                          height: "10px",
                          border: "1px solid #ddd",
                          marginBottom: "2px",
                        }}
                      >
                        <div
                          style={{
                            width: `${percent}%`,
                            height: "100%",
                            backgroundColor: `${color}`,
                          }}
                        ></div>
                      </div>
                    </Box>
                    <Box>
                      <Text>{percent}%</Text>
                    </Box>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Box>
    </>
  );
}

export default MainTaskCntStats;
