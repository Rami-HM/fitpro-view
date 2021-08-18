import React, { useState, useEffect } from "react";
import { Text, Box, Flex, Popover, IconButton } from "gestalt";
import ProjectMemberList from "./ProjectMemberList";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios/axios";

import { actionCreators as projectAction } from "../../redux/modules/project";

function ProjectMemberPopover(props) {
  const { projectAssignList, setProjectAssign } = props;

  const project = useSelector((state) => state.project.project);
  const userSession = useSelector((state) => state.member.member);
  const memberList = useSelector((state) => state.member.totMemberList);

  const { anchorRef, onDismiss } = props;

  const [assignProjectMemberList, setAssignProjectMemberList] =
    useState(projectAssignList);

  const [notAssignProjectMemberList, setNotAssignProjectMemberList] = useState(
    []
  ); //할당되지 않은 사용자

  const [assign, setAssign] = useState(false);
  const [changeMember, setChangeMember] = useState();

  useEffect(() => {
    if (memberList && userSession.mem_idx === project.readeridx) getNotAssignMember();

    return () => {
      onDismiss();
    };
  }, []);

  useEffect(() => {
    assign ? assignMember(changeMember) : notAssignMember(changeMember);
  }, [changeMember]);

  const getNotAssignMember = async () => {
    const filteringMemberList = memberList.filter((memberInfo) => {
      return !assignProjectMemberList.some(
        (projectMemberInfo) => projectMemberInfo.mem_idx === memberInfo.mem_idx
      )
        ? { ...memberInfo, readeryn: false }
        : "";
    });
    setNotAssignProjectMemberList(filteringMemberList);
  };

  //배정 > 미배정
  const assignMember = async (changeMember) => {
    const newAssignMemberList = await assignProjectMemberList.filter(
      (member) => member.mem_idx !== changeMember.mem_idx
    );
    const newNotAssignMemberList = await [
      ...notAssignProjectMemberList,
      changeMember,
    ];
    setAssignProjectMemberList(newAssignMemberList);
    setNotAssignProjectMemberList(newNotAssignMemberList);
  };

  //미배정 > 배정
  const notAssignMember = async (changeMember) => {
    if (changeMember == null) return;
    const newAssignMemberList = await [
      ...assignProjectMemberList,
      changeMember,
    ];
    const newNotAssignMemberList = await notAssignProjectMemberList.filter(
      (member) => member.mem_idx !== changeMember.mem_idx
    );
    setAssignProjectMemberList(newAssignMemberList);
    setNotAssignProjectMemberList(newNotAssignMemberList);
  };

  const saveProjectAssignAPI = () => {
    axios({
      method: "PATCH",
      url: "/project/member/" + project.prj_idx,
      data: {
        assignProjectMemberList,
        reg_mem_idx: userSession.mem_idx,
      },
    }).then(async (res) => {
      const data = res.data.data;

      setProjectAssign(data);
      onDismiss();
    });
  };

  return (
    <Popover
      anchor={anchorRef.current}
      idealDirection="left"
      onDismiss={() => {}}
      positionRelativeToAnchor={false}
      size="md"
    >
      <Box
        flex="grow"
        marginEnd={4}
        marginStart={4}
        marginTop={6}
        marginBottom={8}
        width={350}
      >
        <Flex justifyContent="end">
          <Flex.Item>
            {userSession.mem_idx === project.readeridx ? (
              <IconButton
                accessibilityLabel="save"
                size="xs"
                bgColor="lightGray"
                iconColor="red"
                icon="check"
                onClick={saveProjectAssignAPI}
              ></IconButton>
            ) : (
              <></>
            )}
          </Flex.Item>
        </Flex>
        <Flex direction="column" gap={6}>
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Flex.Item>
              <Text align="center" color="darkGray" weight="bold">
                Member
              </Text>
            </Flex.Item>
          </Flex>

          <ProjectMemberList
            assign={true}
            list={assignProjectMemberList}
            title="배정된 팀원"
            setChangeMember={setChangeMember}
            setAssign={setAssign}
          />
          {
            /* 팀장일경우 */
            userSession.mem_idx === project.readeridx ? (
              <ProjectMemberList
                assign={false}
                list={notAssignProjectMemberList}
                title="미배정 팀원"
                setChangeMember={setChangeMember}
                setAssign={setAssign}
              />
            ) : (
              <></>
            )
          }
        </Flex>
      </Box>
    </Popover>
  );
}

export default ProjectMemberPopover;
