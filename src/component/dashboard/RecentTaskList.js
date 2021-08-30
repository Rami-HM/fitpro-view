import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusComp from "../common/StatusComp";
import { Table, Text, Module, Box } from "gestalt";
import axios from "../../config/axios/axios";
import { TextField, Tooltip } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import { RECENTTASK_DESC } from "../../config/constants/commonConts";

export default function RecentTaskList() {
  const project = useSelector((state) => state.project.project);
  const userSesscion = useSelector((state) => state.member.member);

  const [data, setData] = useState([]);

  const getRecentTaskStatsAPI = () => {
    axios({
      method: "GET",
      url: "/stats/recent/" + project.prj_idx,
    }).then((res) => {
      const newData = res.data.data;
      setData(newData);
    });
  };

  useEffect(() => {
    if (project.hasOwnProperty("prj_idx")) {
      getRecentTaskStatsAPI();
    }
  }, [project]);

  return (
    <div className="wdt-100 wdt-100-chd">
      <Module>
        <Text size="sm" color="gray">
          종료일 임박 순 할일 목록 &nbsp;
          <Tooltip title={RECENTTASK_DESC} placement="right-end">
            <Help color="disabled" style={{ fontSize: 15 }} />
          </Tooltip>
        </Text>
        <Table minWidth="100%" maxHeight={200}>
          <Table.Header>
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
                    할일
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    진행 기간
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    중요도
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    현재 상태
                  </Text>
                </Box>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Box>
                  <Text size="sm" weight="bold">
                    예상 상태
                  </Text>
                </Box>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item) => {
              return (
                <Table.Row key={item.task_idx}>
                  <Table.Cell>
                    <Box width={100}>
                      <Text size="sm" lineClamp={2}>
                        {item.main_task}
                      </Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box>
                      <Text size="sm" lineClamp={2}>
                        {item.task_title}
                      </Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box width={200}>
                      <TextField
                        className="fs-08em"
                        size="small"
                        id="task_start"
                        type="datetime-local"
                        onChange={() => {}}
                        value={item.task_start}
                        disabled
                      />
                    </Box>
                    <Box width={200}>
                      <TextField
                        className="fs-08em"
                        size="small"
                        id="task_end"
                        type="datetime-local"
                        onChange={() => {}}
                        value={item.task_end}
                        disabled
                      />
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box width={70}>
                      <Text size="sm">{item.task_important_desc}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box width={70}>
                      <Text size="sm">{item.task_state_desc}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box width={130}>
                      <StatusComp
                        sDate={item.task_start}
                        eDate={item.task_end}
                        state={item.task_state}
                      />
                    </Box>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Module>
    </div>
  );
}
