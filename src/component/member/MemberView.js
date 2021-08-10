import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Mask, Avatar, Button, Datapoint } from "gestalt";
import { SERVER_URL } from "../../config/constants/commonConts";

function MemberView(props) {
  const { idx, onDismiss } = props;
  const [member, setMember] = useState({
    idx: "",
    id: "",
    name: "",
    email: "",
    birth: "",
    affli: "",
    url: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setMember({
        idx: "1",
        id: "test",
        name: "테스트",
        email: "test@naver.com",
        birth: "1999/01/01",
        affli: "소속",
        url: "/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png",
      });
    }, 100);
  },[idx]);

  return (
    <Box
      display="flex"
      marginStart={-3}
      marginEnd={-3}
      marginBottom={-3}
      marginTop={-3}
      wrap
      width="100%"
      direction="column"
    >
      <Box padding={5}>
        <Flex direction="column" gap={4}>
          <Box display="flex" justifyContent="center" alignContent="center">
            {member.url ? (
              <Mask height={150} width={150} rounding="circle" wash>
                <img
                  alt="weakendclub.com"
                  src={`${SERVER_URL}${member.url}`}
                  style={{ maxWidth: "100%", display: "block" }}
                />
              </Mask>
            ) : (
              <Avatar
                size="xl"
                name={member.name}
              />
            )}
          </Box>
          <Text><Datapoint title="이름" value={member.name}/></Text>
          <Text><Datapoint title="아이디" value={member.id}/></Text>
          <Text><Datapoint title="이메일" value={member.email}/></Text>
          <Text><Datapoint title="생년월일" value={member.birth}/></Text>
          <Text><Datapoint title="소속" value={member.affli}/></Text>

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
              <Box paddingX={1} paddingY={1}>
                <Button text="Cancel" size="lg" onClick={onDismiss} />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default MemberView;
