import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Mask, Avatar, Button, Datapoint } from "gestalt";
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
      method:'GET',
      url : "/member/info/"+idx
    }).then((res)=>{
      setMember(res.data);
    });

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
            {member.src ? (
              <Mask height={150} width={150} rounding="circle" wash>
                <img
                  alt={member.name}
                  src={`${member.src}`}
                  style={{ maxWidth: "100%", display: "block" }}
                />
              </Mask>
            ) : (
              <Avatar
                size="xl"
                name={member.mem_name}
              />
            )}
          </Box>
          <Text><Datapoint title="이름" value={member.mem_name}/></Text>
          <Text><Datapoint title="아이디" value={member.mem_id}/></Text>
          <Text><Datapoint title="이메일" value={member.mem_email}/></Text>
          <Text><Datapoint title="생년월일" value={member.mem_birth || ''}/></Text>
          <Text><Datapoint title="소속" value={member.mem_affli || ''}/></Text>

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
