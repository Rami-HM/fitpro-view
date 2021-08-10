import React, { useState, useEffect } from "react";
import { TapArea, Text, Box, Flex, Mask, Checkbox, Avatar } from "gestalt";
import MemberInfoWithCheck from "./MemberInfoWithCheck";

function MemberList(props) {
  const { checkedMember, projectId } = props;
  const [memberList, setMemberList] = useState([]);
  const [projectMemberList, setProjectMemberList] = useState([]);

  const getProjectMemberListAPI = () => {
    setTimeout(() => {
      setProjectMemberList([
        {
          idx: "1",
        },
        {
          idx: "3",
        },
        {
          idx: "4",
        },
      ]);
    }, 1000);
  };

  const getMemberListAPI = () => {
    setTimeout(() => {
      setMemberList([
        {
          idx: "1",
          id: "test",
          name: "테스트",
          email: "test@naver.com",
          birth: "1999/01/01",
          affli: "소속",
          url: "/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png",
        },
        {
          idx: "2",
          id: "tes2",
          name: "테스트2",
          email: "test@naver.com",
          birth: "1999/01/01",
          affli: "소속",
          url: "/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png",
        },
        {
          idx: "3",
          id: "tes3",
          name: "테스트3",
          email: "test@naver.com",
          birth: "1999/01/01",
          affli: "소속",
          url: "/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png",
        },
        {
          idx: "4",
          id: "test4",
          name: "테스트4",
          email: "test@naver.com",
          birth: "1999/01/01",
          affli: "소속",
          url: "/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png",
        },
        {
          idx: "5",
          id: "tes5",
          name: "테스트5",
          email: "test@naver.com",
          birth: "1999/01/01",
          affli: "소속",
          url: "/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png",
        },
        {
          idx: "6",
          id: "tes6",
          name: "테스트6",
          email: "test@naver.com",
          birth: "1999/01/01",
          affli: "소속",
          url: "/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png",
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    getProjectMemberListAPI();
    getMemberListAPI();
  }, []);

  return (
    <>
      <Box
        flex="grow"
        marginEnd={4}
        marginStart={4}
        marginTop={6}
        marginBottom={8}
      >
        <Flex direction="column" gap={6}>
          <Text align="center" color="darkGray" weight="bold">
            Member List
          </Text>
        </Flex>
      </Box>
      <Box height={300} overflow="scrollY">
        <Box marginEnd={4} marginStart={4}>
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={4}>
              {memberList.map((data, index) =>
                checkedMember ? (
                  <MemberInfoWithCheck
                    key={index}
                    member={data}
                    projectMemberList={projectMemberList}
                  />
                ) : (
                  ""
                )
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default MemberList;
