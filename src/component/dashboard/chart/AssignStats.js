import React, { useEffect, useState } from "react";
import { Text, Table, Avatar, Box } from "gestalt";
import {
  ASSIGNSTATE_DESC,
  COMPLE_DESC,
} from "../../../config/constants/commonConts";
import { Tooltip } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import axios from "../../../config/axios/axios";
import { useSelector } from "react-redux";
import randomColor from "randomcolor";

function AssignStats() {
  const [assign, setAssign] = useState([]);
  const project = useSelector((state) => state.project.project);

  const getAssignStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/assign/" + project.prj_idx,
    }).then((res) => {
      const result = res.data.data;
      setAssign(result);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      getAssignStatsAPI();
    }
  }, [project]);

  return (
    <>
      <Box height={220}>
        <Text size="sm" color="gray">
          담당자별 할일 통계 &nbsp;
          <Tooltip title={ASSIGNSTATE_DESC} placement="right-end">
            <Help color="disabled" style={{ fontSize: 15 }} />
          </Tooltip>
        </Text>
        <Table maxHeight={200}>
          <Table.Header sticky>
            <Table.Row>
              <Table.HeaderCell>
                <Box width={50} margin={0}>
                  <Text size="sm" weight="bold">
                    담당자
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="sm" weight="bold">
                  할당된 건수
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="sm" weight="bold">
                  처리 건수
                  <Tooltip title={COMPLE_DESC} placement="top">
                    <Help color="disabled" style={{ fontSize: 15 }} />
                  </Tooltip>
                </Text>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Text size="sm" weight="bold">
                  처리율
                </Text>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {assign.map((item) => {
              const color = randomColor({
                luminosity: "light",
                hue: "red",
              });
              const percent = Math.round(
                (item.comple_cnt /
                  (item.total_cnt === 0 ? 1 : item.total_cnt)) *
                  100
              );
              return (
                <Table.Row key={item.mem_idx}>
                  <Table.Cell>
                    <Box width={50} margin={0}>
                      <Avatar
                        size="sm"
                        src={item.mem_profile}
                        name={item.mem_name}
                      />
                      <Text size="sm">{item.mem_name}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box display="flex" alignContent="center">
                      <Text size="lg">{item.total_cnt} 건</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box width={50}>
                      <Text>{item.comple_cnt} 건</Text>
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

export default AssignStats;
