import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Button,
  Box,
  Flex,
  Text,
  Datapoint,
  Avatar,
  Module,
  Divider,
} from "gestalt";
import { Tooltip, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../config/axios/axios";

import TaskSubList from "./TaskSubList";

import { actionCreators as projectAction } from "../../redux/modules/project";

function TaskView(props) {
  const { onDismiss, taskIdx } = props;
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.project);

  const [isMainTask, setIsMainTask] = useState(false);

  const [task, setTask] = useState({
    task_idx: taskIdx,
    task_title: "",
    task_memo: "",
    task_start: project.prj_start + "T00:00" || "2000-01-01T00:00",
    task_end: project.prj_end + "T23:00" || "9999-12-31T23:00",
    reg_mem_idx: "",
    prj_idx: "",
    task_important: "O",
    task_state: "SH",
    task_important_desc: "",
    task_state_desc: "",
    upper_task_idx: "",
    fail_idx: "",
    fail_contents: "",
  });

  useEffect(() => {
    getTaskDetail();
  }, []);

  const projectDetail = async (prj_idx) => {
    try {
      dispatch(projectAction.getProject(Number(prj_idx)));
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskDetail = async () => {
    await axios({
      method: "GET",
      url: "/task/detail/" + taskIdx,
    }).then((res) => {
      const result = res.data.data;
      setTask(result);

      if (project.prj_idx !== result.prj_idx) projectDetail(result.prj_idx);
      setIsMainTask(!result.upper_task_idx);
    });
  };

  return (
    <Box>
      <Box
        display="flex"
        marginStart={-3}
        marginEnd={-3}
        marginBottom={-3}
        marginTop={-3}
        wrap
        direction="column"
      >
        <Tooltip title={project.prj_title}>
          <Box flex="grow" paddingX={3} paddingY={3} maxWidth="100%">
            <PageHeader
              title={project.prj_title}
              maxWidth="40vw"
              subtext={project.prj_sub_title}
            />
          </Box>
        </Tooltip>

        <Box flex="grow" paddingY={3} maxWidth="100%">
          <Module id="title">
            <Flex gap={3}>
              <Flex.Item>
                <div className="overflow-ellipsis max-wdt-600">
                  <Datapoint title="할일" value={task.task_title} />
                </div>
              </Flex.Item>
              <Flex.Item>
                <Box
                  minWidth={200}
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Avatar
                    size="md"
                    src={task.worker_src}
                    name={task.worker || ""}
                  />
                  <Box marginTop={5} marginStart={3}>
                    <Text>{task.worker}</Text>
                  </Box>
                </Box>
              </Flex.Item>
            </Flex>
          </Module>
        </Box>
        <Box margin={5} maxWidth="100%">
          {isMainTask ? (
            <></>
          ) : (
            <>
              <Box flex="grow" marginBottom={3}>
                <Flex gap={2}>
                  <Flex.Item>
                    <Box minWidth={250}>
                      <Text>
                        <Datapoint
                          title="중요도"
                          value={task.task_important_desc || ""}
                        />
                      </Text>
                    </Box>
                  </Flex.Item>
                  <Flex.Item>
                    <Box minWidth={200}>
                      <Text>
                        <Datapoint
                          title="진행상태"
                          value={task.task_state_desc || ""}
                        />
                      </Text>
                    </Box>
                  </Flex.Item>
                </Flex>
              </Box>
              <Divider />
            </>
          )}

          {task.fail_idx ? (
            <>
              <Box flex="grow" paddingY={5}>
                <Text>
                  <Datapoint
                    title="미처리 사유"
                    value={task.fail_contents || ""}
                  />
                </Text>
              </Box>
              <Divider />
            </>
          ) : (
            <></>
          )}
          <>
            <Box flex="grow" marginTop={5} marginBottom={5}>
              <Box
                display="flex"
                wrap
                marginStart={-3}
                marginEnd={-3}
                marginBottom={-3}
                marginTop={-3}
              >
                <Box flex="grow" paddingX={3} paddingY={3}>
                  <TextField
                    className="non-baseline"
                    id="task_start"
                    label="시작일"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={() => {}}
                    value={task.task_start}
                    disabled
                  />
                </Box>
                <Box flex="grow" paddingX={3} paddingY={3}>
                  <TextField
                    className="non-baseline"
                    id="task_end"
                    label="종료일"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={() => {}}
                    value={task.task_end}
                    disabled
                  />
                </Box>
              </Box>
            </Box>
            <Divider />
          </>
          <Box flex="grow" paddingY={3}>
            <Text>
              <Datapoint title="메모" value={task.task_memo || ""} />
            </Text>
          </Box>
        </Box>
        {isMainTask ? (
          <Box  paddingY={3}>
            <Module>
              <Text size="sm" color="gray">
                할당 된 서브 할일
              </Text>
              <Box flex="grow" paddingY={2}>
                <TaskSubList upperTaskIdx={taskIdx} />
              </Box>
            </Module>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <Box
          justifyContent="end"
          marginStart={-1}
          marginEnd={-1}
          marginTop={-1}
          marginBottom={-1}
          display="flex"
          wrap
        >
          <Box paddingX={1} marginTop={5}>
            <Button text="Cancel" size="lg" onClick={onDismiss} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskView;
