import React, { useEffect, useState } from "react";
import {
  Text,
  Avatar,
  Box,
  ScrollBoundaryContainer,
  Flex,
  Divider,
} from "gestalt";
import { TextField } from "@material-ui/core";
import axios from "../../config/axios/axios";
import { classState } from "../../util/common";

function TaskSubList(props) {
  const { upperTaskIdx } = props;
  const [subTaskList, setSubTaskList] = useState([]);

  const getSubTaskList = () => {
    axios({
      method: "GET",
      url: "/task/sub/list/" + upperTaskIdx,
    }).then((res) => {
      const result = res.data.data;
      console.log(result);
      setSubTaskList(result);
    });
  };

  useEffect(() => {
    getSubTaskList();
    console.log(subTaskList);
  }, [upperTaskIdx]);

  return (
    <>
      {subTaskList.length > 0 ? (
        <ScrollBoundaryContainer overflow="scrollY" height={300}>
          {subTaskList.map((item) => {
            return (
              <>
                <Box margin={5} key={item.idx}>
                  <Flex gap={5} alignItems="stretch">
                    <Flex.Item>
                      <Box>
                        <Avatar
                          size="lg"
                          src={item.worker_src}
                          name={item.worker}
                        />
                        <Box marginTop={2}>
                          <Text size="sm" color="gray" align="center">
                            {item.worker}
                          </Text>
                        </Box>
                      </Box>
                    </Flex.Item>
                    <Flex.Item>
                      <Box marginBottom={5}>
                        <Flex gap={2}>
                          <Flex.Item minWidth={70}>
                            {classState(item.task_state)}
                          </Flex.Item>
                          <Flex.Item>
                            <div className="overflow-ellipsis max-wdt-400">
                              {item.task_title}
                            </div>
                          </Flex.Item>
                        </Flex>
                      </Box>
                      <Box marginBottom={1} display="flex">
                        <Box flex="shrink">
                          <TextField
                            size="small"
                            id="task_start"
                            className="fs-09em non-baseline"
                            label="시작일"
                            type="datetime-local"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={() => {}}
                            value={item.task_start}
                            disabled
                          />
                        </Box>
                        <Box flex="shrink">
                          <TextField
                            size="small"
                            id="task_end"
                            className="fs-09em non-baseline"
                            label="종료일"
                            type="datetime-local"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={() => {}}
                            value={item.task_end}
                            disabled
                          />
                        </Box>
                      </Box>
                    </Flex.Item>
                  </Flex>
                </Box>
                <Divider />
              </>
            );
          })}
        </ScrollBoundaryContainer>
      ) : (
        <Box column={12}>
          <Text color="gray" align="center">
            할당 된 서브 할일이 없습니다.
          </Text>
        </Box>
      )}
    </>
  );
}

export default TaskSubList;
