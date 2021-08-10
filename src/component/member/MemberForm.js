import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Text, TextField, Avatar, Button } from "gestalt";
import { SERVER_URL } from "../../config/constants/commonConts";

function MemberForm(props) {
  // useEffect(() => {
  //   console.log(contents);
  // }, [contents]);
  const {onDismiss} = props;
  const inputFile = useRef(null) ;
  
  const onImageClick = () => {
   inputFile.current.click();
  };

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
            <div onClick={onImageClick}>
            <Avatar
              size="xl"
              src={`${SERVER_URL}/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png`}
              name="____"
            />
            </div>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
          </Box>
          <Box>
            <Text inline weight="bold">
              _____ 님,
            </Text>
            <Text inline size="sm">
              &nbsp; 반갑습니다.
            </Text>
          </Box>
          <TextField
            id="id"
            disabled
            onChange={() => {}}
          />
          <TextField
            id="password"
            type="password"
            autoComplete="current-password"
            helperText="영어 대소문자, 특수문자를 포함한 8자 이상"
            placeholder="비밀번호를 입력하세요."
            onChange={() => {}}
          />
          <TextField
            id="name"
            disabled
            onChange={() => {}}
          />
          <TextField
            id="email"
            type="email"
            placeholder="이메일을 입력하세요."
            onChange={() => {}}
          />
          <TextField
            id="affli"
            placeholder="소속을 입력하세요."
            onChange={() => {}}
          />
          <TextField
            id="birth"
            type="date"
            placeholder="생년월일 입력하세요."
            onChange={() => {}}
          />
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
                <Button text="Cancel" size="lg" onClick={onDismiss}/>
              </Box>
              <Box paddingX={1} paddingY={1}>
                <Button text="Submit" color="red" size="lg" type="submit" />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default MemberForm;
