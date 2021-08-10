import React, { useState } from "react";
import { Box, Button, Flex, Sheet, Text, TextField } from "gestalt";
import ImageUploader from "react-images-upload";
import axios from '../../config/axios/axios';

function Register(props) {
  
  const { onDismiss } = props;
  const [pictures, setPictures] = useState([]);

  const onDrop = async (picture) => {
    // 여기에 ajax를 넣을 수 있다.
    setPictures(picture);
  };

  const uploadImg = async () => {
    let formData = new FormData();
    pictures.forEach((element) => {
      formData.append("file", element);
    });

    await axios({
      method: "POST",
      url: "/api/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log(formData);
      console.log(res);
    });
  };

  const inserMemberAPI =() =>{
    uploadImg();
  }
 
  return (
    <Sheet
      accessibilityDismissButtonLabel="Close sheet"
      accessibilitySheetLabel="creation for new"
      heading="FITPRO의 새로운 사용자가 되어주세요!"
      onDismiss={onDismiss}
      footer={() => (
        <Flex alignItems="center" justifyContent="end">
          <Button inline color="red" text="Save" onClick={inserMemberAPI} />
        </Flex>
      )}
      size="md"
    >
      <Flex direction="column" gap={12}>
        <Flex direction="column" gap={4}>
          <Box>
            <Text inline weight="bold">
              Step 1:
            </Text>
            <Text inline size="sm">
              {" "}
              사용자 개인정보{" "}
            </Text>
          </Box>
          <Text>가입 시 필수로 입력해야하는 부분이에요.</Text>
          <TextField
            id="id"
            placeholder="아이디를 입력하세요."
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
            placeholder="이름를 입력하세요."
            onChange={() => {}}
          />
          <TextField
            id="email"
            type="email"
            placeholder="이메일을 입력하세요."
            onChange={() => {}}
          />
        </Flex>
        <Flex direction="column" gap={4}>
          <Box>
            <Text inline weight="bold">
              Step 2
            </Text>
          </Box>
          <Text>선택적으로 정보를 입력하세요!</Text>
          <TextField
            id="birth"
            type="date"
            placeholder="생년월일을 입력하세요."
            onChange={() => {}}
          />
          <TextField
            id="affil"
            placeholder="소속을 입력하세요."
            onChange={() => {}}
          />
        </Flex>
        <Flex direction="column" gap={4}>
          <Box>
            <Text inline weight="bold">
              Step 3
            </Text>
          </Box>
          <Text>프로필 사진으로 나를 표현해주세요!</Text>
          <ImageUploader
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
          />
        </Flex>
      </Flex>
    </Sheet>
  );
}
export default Register;
