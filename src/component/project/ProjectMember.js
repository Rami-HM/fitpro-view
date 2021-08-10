import React, { useState } from "react";
import {
  AvatarGroup,
  Text,
  Box,
  Flex,
  Layer,
  Popover,
  Avatar,
  IconButton,
} from "gestalt";
import MemberModal from "../../pages/member/MemberModal";

function ProjectMember(props) {
  const { open, setOpen } = props;
  const anchorRef = React.useRef(null);

  const [isOpenMemberView, setIsOpenMemberView] = useState(false);

  const [memberIdx, setMemberIdx] = useState(0);

  const onDismiss = () => {
    setIsOpenMemberView(false);
  };

  const showMemberView = (idx) => {
    setMemberIdx(idx);
    setIsOpenMemberView(true);
  };

  const collaborators = [
    {
      idx: 1,
      name: "Keerthi",
      src: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    },
    {
      idx: 2,
      name: "Alberto",
      src: "https://i.ibb.co/NsK2w5y/Alberto.jpg",
    },
    {
      idx: 3,
      name: "Shanice",
      src: "https://i.ibb.co/7tGKGvb/shanice.jpg",
    },
    {
      idx: 4,
      name: "Keerthi",
      src: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    },
    {
      idx: 5,
      name: "Alberto",
      src: "https://i.ibb.co/NsK2w5y/Alberto.jpg",
    },
    {
      idx: 6,
      name: "Shanice",
      src: "https://i.ibb.co/7tGKGvb/shanice.jpg",
    },
  ];

  const List = ({ title }) => (
    <Flex direction="column" gap={4}>
      <Text color="darkGray" size="sm">
        {title}
      </Text>
      <Flex direction="column" gap={2}>
        {collaborators.map((item, index) => (
          <Flex
            key={index}
            alignItems="center"
            gap={2}
            onClick={() => showMemberView(item.idx)}
          >
            <Flex>
              <Avatar size="md" name={item.name} src={item.src} />
              <Text weight="bold">{item.name}</Text>
              <Flex.Item>
                <IconButton
                  accessibilityLabel="This IconButton is an example of IconButton acting as a button"
                  icon="add"
                  onClick={() => {}}
                />
              </Flex.Item>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );

  return (
    <>
      {isOpenMemberView ? (
        <MemberModal onDismiss={onDismiss} mode={"View"} idx={memberIdx} />
      ) : (
        ""
      )}
      <AvatarGroup
        accessibilityLabel="Click to see group collaborators."
        role="button"
        onClick={() => setOpen((memberOpen) => !memberOpen)}
        ref={anchorRef}
        size="md"
        collaborators={collaborators}
      />
      {open ? (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
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
              <Flex direction="column" gap={6}>
                <Text align="center" color="darkGray" weight="bold">
                  Member
                </Text>
                <List title="titititifkfk" />
              </Flex>
            </Box>
          </Popover>
        </Layer>
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectMember;
