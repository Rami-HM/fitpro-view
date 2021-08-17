import React, { useState } from "react";
import { Flex, Text, Box, Avatar, TapArea, IconButton } from "gestalt";
import MemberModal from "../../pages/member/MemberModal";
import { useSelector } from "react-redux";

function ProjectMemberList(props) {
  const { assign, list, title, setAssign, setChangeMember } = props;
  const [isOpenMemberView, setIsOpenMemberView] = useState(false);

  const project = useSelector((state) => state.project.project);
  const userSession = useSelector((state) => state.member.member);

  const [memberIdx, setMemberIdx] = useState(0);
  const showMemberView = (idx) => {
    setMemberIdx(idx);
    setIsOpenMemberView(true);
  };
  const onDismiss = () => {
    setIsOpenMemberView(false);
  };

  const changeProjectMember = (changeMember) => {
    setAssign(assign);
    setChangeMember(changeMember);
  };

  return (
    <>
      {isOpenMemberView ? (
        <MemberModal onDismiss={onDismiss} mode={"View"} idx={memberIdx} />
      ) : (
        ""
      )}
      <Flex direction="column" gap={4}>
        <Text color="darkGray" size="sm">
          {title}
        </Text>
        <Flex direction="column" gap={2}>
          {list.map((item, index) => (
            <Box key={item.mem_idx}>
              <Flex alignItems="center" gap={4} width="100%">
                <Avatar
                  size="md"
                  name={item.mem_name}
                  src={item.src}
                  verified={item.mem_idx === project.readeridx ? true : false}
                />
                <Flex.Item flex="grow">
                  <TapArea
                    rounding={4}
                    onTap={() => showMemberView(item.mem_idx)}
                  >
                    <Text weight="bold">{item.mem_name}</Text>
                  </TapArea>
                </Flex.Item>
                {userSession.mem_idx === project.readeridx ? (
                  item.mem_idx === project.readeridx ? (
                    ""
                  ) : (
                    <IconButton
                      accessibilityLabel="This IconButton is an example of IconButton acting as a button"
                      icon={assign ? "cancel" : "person-add"}
                      onClick={() => changeProjectMember(item)}
                    />
                  )
                ) : (
                  <></>
                )}
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  );
}

export default ProjectMemberList;
