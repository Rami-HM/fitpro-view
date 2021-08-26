import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Sheet, Text, TextField } from "gestalt";
import ImageUploader from "react-images-upload";
import axios from "../../config/axios/axios";

import {
  resetValiFields,
  getFailValidationList,
  handleValidation,
} from "../../actions/validation/validation";
import { useDispatch } from "react-redux";
import { actionCreators as ToastAction } from "../../redux/modules/toast";

function Register(props) {
  const { onDismiss } = props;
  const [pictures, setPictures] = useState([]);
  const [inputMember, setInputMember] = useState({
    mem_id: "",
    mem_pwd: "",
    mem_name: "",
    mem_email: "",
    mem_birth: "",
    mem_affil: "",
    mem_profile: "",
  });

  const [failValidationList, setFailValidationList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    resetForm();

    return () => {};
  }, []);

  //유효성 검사 후 애니메이션을 위한 클래스 제거 ( 클래스 미제거 시 이후 버튼을 눌러도 애니메이션이 동작하지 않음.)
  useEffect(() => {
    if (failValidationList.length !== 0) {
      setTimeout(() => {
        setFailValidationList([]);
      }, 1500);
    }
  }, [failValidationList]);

  const resetForm = () => {
    setInputMember({
      mem_id: "",
      mem_pwd: "",
      mem_name: "",
      mem_email: "",
      mem_birth: "",
      mem_affil: "",
      mem_profile: "",
    });
    resetValiFields();
    setFailValidationList([]);
  };

  const onDrop = async (picture) => {
    // 여기에 ajax를 넣을 수 있다.
    setPictures(picture);
  };

  const handleChange = (field) => (e) => {
    const value = e.value;

    setInputMember((prevInputUser) => {
      return {
        ...prevInputUser,
        [field]: value,
      };
    });
  };

  const uploadImg = async () => {
    let formData = new FormData();
    pictures.forEach((element) => {
      formData.append("file", element);
    });

    let result = "";
    await axios({
      method: "POST",
      url: "/api/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      result = res.data.data.files;
    });

    return result;
  };

  const inserMemberAPI = async (mem_profile_info) => {
    await axios({
      method: "POST",
      url: "/member/register",
      data: {
        ...inputMember,
        // mem_birth: moment(inputMember.mem_birth).format("YYYY-MM-DD"),
        mem_birth: new Date(inputMember.mem_birth),
        mem_profile: mem_profile_info,
      },
    }).then((res) => {
      // setContents(msg);
      // setIsAlert(true);
      if (res.isSuc) {
        dispatch(ToastAction.showToast(res.data.message));
        onDismiss();
      }
    });
  };

  const register = async () => {
    const list = getFailValidationList();

    if (list.length !== 0) {
      setFailValidationList(list);
      return;
    }

    let mem_profile_info = "";
    if (pictures.length > 0) {
      mem_profile_info = await uploadImg();
    }
    inserMemberAPI(mem_profile_info);
  };

  return (
    <>
      <Sheet
        accessibilityDismissButtonLabel="Close sheet"
        accessibilitySheetLabel="creation for new"
        heading="FITPRO의 새로운 사용자가 되어주세요!"
        onDismiss={onDismiss}
        footer={() => (
          <Flex alignItems="center" justifyContent="end">
            <Button inline color="red" text="Save" onClick={register} />
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
            <div
              className={
                failValidationList.includes("id") ? "shake-horizontal" : ""
              }
            >
              <TextField
                id="id"
                placeholder="아이디를 입력하세요."
                value={inputMember.mem_id || ""}
                onChange={handleChange("mem_id")}
                errorMessage={handleValidation(
                  inputMember,
                  "id",
                  "mem_id",
                  true
                )}
              />
            </div>
            <div
              className={
                failValidationList.includes("password")
                  ? "shake-horizontal"
                  : ""
              }
            >
              <TextField
                id="password"
                type="password"
                helperText="특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내"
                placeholder="비밀번호를 입력하세요."
                value={inputMember.mem_pwd || ""}
                onChange={handleChange("mem_pwd")}
                errorMessage={handleValidation(
                  inputMember,
                  "password",
                  "mem_pwd",
                  true
                )}
              />
            </div>
            <div
              className={
                failValidationList.includes("name") ? "shake-horizontal" : ""
              }
            >
              <TextField
                id="name"
                placeholder="이름를 입력하세요."
                value={inputMember.mem_name || ""}
                onChange={handleChange("mem_name")}
                errorMessage={handleValidation(
                  inputMember,
                  "name",
                  "mem_name",
                  true
                )}
              />
            </div>
            <div
              className={
                failValidationList.includes("email") ? "shake-horizontal" : ""
              }
            >
              <TextField
                id="email"
                type="email"
                placeholder="이메일을 입력하세요."
                value={inputMember.mem_email || ""}
                onChange={handleChange("mem_email")}
                errorMessage={handleValidation(
                  inputMember,
                  "email",
                  "mem_email",
                  true
                )}
              />
            </div>
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
              value={inputMember.mem_birth || ""}
              onChange={handleChange("mem_birth")}
            />
            <div
              className={
                failValidationList.includes("text") ? "shake-horizontal" : ""
              }
            >
              <TextField
                id="affil"
                placeholder="소속을 입력하세요."
                value={inputMember.mem_affil || ""}
                onChange={handleChange("mem_affil")}
                errorMessage={handleValidation(
                  inputMember,
                  "text-10",
                  "mem_affil",
                  false
                )}
              />
            </div>
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
    </>
  );
}
export default Register;
