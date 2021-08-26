import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Mask,
  Avatar,
  Button,
  Datapoint,
  Card,
} from "gestalt";
import axios from "../../config/axios/axios";

function MemberView(props) {
  const { idx, onDismiss } = props;
  const [member, setMember] = useState({
    mem_idx: "",
    mem_id: "",
    mem_name: "",
    mem_email: "",
    mem_birth: "",
    mem_affli: "",
    mem_profile: "",
    src: "",
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: "/member/info/" + idx,
    }).then((res) => {
      setMember(res.data);
    });
  }, [idx]);

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
        <Flex gap={10}>
          <Flex.Item marginEnd={5}>
            <Card
              image={
                  <Avatar size = "xl" name={member.mem_name} src = {member.src}/>
              }
            >
              <Text align="center" weight="bold">
                <Box paddingX={3} paddingY={2}>
                  {member.mem_name}
                </Box>
              </Text>
            </Card>
          </Flex.Item>
          <Flex.Item>
            <Text>
              <Datapoint title="아이디" value={member.mem_id} />
            </Text>
            <Text>
              <Datapoint title="이메일" value={member.mem_email} />
            </Text>
            <Text>
              <Datapoint title="생년월일" value={member.mem_birth || ""} />
            </Text>
            <Text>
              <Datapoint title="소속" value={member.mem_affil || ""} />
            </Text>
          </Flex.Item>
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
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default MemberView;
