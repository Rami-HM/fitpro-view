import React, { useState, useEffect } from "react";
import { Text, Box, Flex, Popover, IconButton } from "gestalt";
import ProjectMemberList from "./ProjectMemberList";

function ProjectMemberPopover(props) {
  const { anchorRef, assignProjectMemberList, setAssignProjectMemberList } =
    props;

  const [memberList, setMemberList] = useState([]); //전체 사용자

  const [notAssignProjectMemberList, setNotAssignProjectMemberList] = useState(
    []
  ); //할당되지 않은 사용자

  const [assign, setAssign] = useState(false);
  const [changeMember, setChangeMember] = useState();

  useEffect(() => {
    getMemberList();
  }, []);

  useEffect(() => {
    assign ? assignMember(changeMember) : notAssignMember(changeMember);
  }, [changeMember]);

  const getMemberList = async () => {
    setTimeout(() => {
      const totmemberList = [
        {
          idx: "1",
          name: "name1",
          src: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
        },
        {
          idx: "2",
          name: "name2",
          src: "https://i.ibb.co/NsK2w5y/Alberto.jpg",
        },
        {
          idx: "3",
          name: "name3",
          src: "https://i.ibb.co/7tGKGvb/shanice.jpg",
        },
        {
          idx: "4",
          name: "name4",
          src: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
        },
        {
          idx: "5",
          name: "name5",
          src: "https://i.ibb.co/NsK2w5y/Alberto.jpg",
        },
        {
          idx: "6",
          name: "name6",
          src: "https://i.ibb.co/7tGKGvb/shanice.jpg",
        },
      ];

      const filteringMemberList = totmemberList.filter((memberInfo) => {
        return !assignProjectMemberList.some(
          (projectMemberInfo) => projectMemberInfo.idx === memberInfo.idx
        )
          ? memberInfo
          : "";
      });

      setMemberList(totmemberList);
      setNotAssignProjectMemberList(filteringMemberList);
    }, 10);
  };

  const assignMember = (changeMember) => {
    const newAssignMemberList = assignProjectMemberList.filter(
      (member) => member.idx !== changeMember.idx
    );
    const newNotAssignMemberList = [
      ...notAssignProjectMemberList,
      changeMember,
    ];
    setAssignProjectMemberList(newAssignMemberList);
    setNotAssignProjectMemberList(newNotAssignMemberList);
  };
  const notAssignMember = (changeMember) => {
    if (changeMember == null) return;
    const newAssignMemberList = [...assignProjectMemberList, changeMember];
    const newNotAssignMemberList = notAssignProjectMemberList.filter(
      (member) => member.idx !== changeMember.idx
    );
    setAssignProjectMemberList(newAssignMemberList);
    setNotAssignProjectMemberList(newNotAssignMemberList);
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
            <IconButton size="xs" bgColor="lightGray" iconColor="red" icon="check"></IconButton>
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
            assign
            list={assignProjectMemberList}
            title="배정된 팀원"
            setChangeMember={setChangeMember}
            setAssign={setAssign}
          />
          {/* 팀장일경우 */}
          <ProjectMemberList
            list={notAssignProjectMemberList}
            title="미배정 팀원"
            setChangeMember={setChangeMember}
            setAssign={setAssign}
          />
        </Flex>
      </Box>
    </Popover>
  );
}

export default ProjectMemberPopover;
