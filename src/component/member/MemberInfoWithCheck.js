import React, {useState, useEffect} from "react";
import { TapArea, Text, Box, Flex, Mask, Checkbox, Avatar } from "gestalt";
import { SERVER_URL } from "../../config/constants/commonConts";

function MemberInfoWithCheck(props) {
  const { member, projectMemberList } = props;

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(handleCheck(member.idx));

    return(()=>{

    });

  }, [member]);

  const handleCheck = (val) => {
    return projectMemberList.some((item) => item.idx === val);
  };

  const checkedMemberAPI =() =>{
    
    setTimeout(()=>{

        //data base update
        // merge delete and insert
        
        setChecked(!checked);

    },500)
  }

  return (
    <TapArea key={member.idx} onTap={() => {}}>
      <Flex gap={2} alignItems="center">
        <Box>
          <Checkbox
            checked={checked}
            id="english"
            name="english"
            onChange={()=>checkedMemberAPI(!checked)}
          />
        </Box>

        <Box height={50} width={50} overflow="hidden" rounding={2}>
          <Mask rounding={2}>
            {member.url ? (
              <Mask rounding="circle" wash>
                <img
                  alt="weakendclub.com"
                  src={`${SERVER_URL}${member.url}`}
                  style={{ maxWidth: "100%", display: "block" }}
                />
              </Mask>
            ) : (
              <Avatar size="xl" name={member.name} />
            )}
          </Mask>
        </Box>
        <Box>
          <Text size="sm">{member.affli}</Text>
          <Text align="center" color="darkGray" weight="bold">
            {member.name}
          </Text>
        </Box>
      </Flex>
    </TapArea>
  );
}

export default MemberInfoWithCheck;
