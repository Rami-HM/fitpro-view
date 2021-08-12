import React, { useState } from "react";
import { Flex, Text, Box, Avatar, TapArea, IconButton } from "gestalt";
import MemberModal from "../../pages/member/MemberModal";

function ProjectMemberList(props) {
  const { assign, list, title, setAssign, setChangeMember } = props;
  const [isOpenMemberView, setIsOpenMemberView] = useState(false);

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
            <Box key={item.idx}>
              <Flex alignItems="center" gap={4} width="100%">
                <Avatar
                  size="md"
                  name={item.name}
                  src={item.src}
                  verified={item.projectManager === "true" ? true : false}
                />
                <Flex.Item flex="grow">
                  <TapArea rounding={4} onTap={() => showMemberView(item.idx)}>
                    <Text weight="bold">{item.name}</Text>
                  </TapArea>
                </Flex.Item>
                {item.projectManager === "true" ? (
                  ""
                ) : (
                  <IconButton
                    accessibilityLabel="This IconButton is an example of IconButton acting as a button"
                    icon={assign ? "cancel" : "person-add"}
                    onClick={() => changeProjectMember(item)}
                  />
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
