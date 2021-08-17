import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Text, TextField, Avatar, Button } from "gestalt";
import { SERVER_URL } from "../../config/constants/commonConts";
import { useSelector } from "react-redux";
import {
  resetValiFields,
  getFailValidationList,
  handleValidation,
} from "../../actions/validation/validation";
import axios from "../../config/axios/axios";
import noImage from "../../resource/image/noImage.png";
import {isSessionToken, logout} from '../../actions/session/session';

//redux
import { useDispatch } from "react-redux";
import { actionCreators as memberAction } from "../../redux/modules/member";


const initMember = {
  mem_id: "",
  mem_pwd: "",
  mem_name: "",
  mem_email: "",
  mem_birth: "",
  mem_affil: "",
  mem_profile: "",
};

function MemberForm(props) {
  const { onDismiss } = props;
  const inputFile = useRef(null);
  const memberInfo = useSelector((state) => state.member.member);
  const [inputMember, setInputMember] = useState(initMember);
  const [failValidationList, setFailValidationList] = useState([]);

  const [pictures, setPictures] = useState([]);
  const [previewURL, setPreviewURL] = useState("");

  const dispatch = useDispatch();
  
  useEffect(() => {
    resetForm();
    setInputMember({ ...initMember, ...memberInfo });
    setPreviewURL(
      memberInfo.mem_profile ? SERVER_URL + memberInfo.mem_profile : noImage
    );
  }, []);

  const resetForm = () => {
    setInputMember(initMember);
    resetValiFields();
    setFailValidationList([]);
  };

  const onImageClick = () => {
    inputFile.current.click();
  };

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setPictures([file]);
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
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
      result = res.data.data.files ? res.data.data.files[0] : "";
    });

    return result;
  };

  const updateMemberAPI = async (mem_profile_info) => {
    await axios({
      method: "PATCH",
      url: "/member/modify",
      data: {
        ...inputMember,
        mem_birth: new Date(inputMember.mem_birth),
        mem_profile: mem_profile_info
      },
    }).then(async (res) => {
      let msg = res.data.error ? res.data.error : res.data.message;
      alert(msg);

      const member = await isSessionToken();
      dispatch(memberAction.setMember(member));

      if (!res.data.error) onDismiss();
    });
  };

  const modifyBtn = async () => {
    const list = getFailValidationList();

    if (list.length !== 0) {
      setFailValidationList(list);
      return;
    }
    let mem_profile_info = "";
    if (pictures.length > 0) {
      mem_profile_info = await uploadImg();
    }
    updateMemberAPI(mem_profile_info);
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
          <Box display="flex" justifyContent="end" alignContent="center">
              <Button text="로그아웃" size="sm" onClick = {logout}/>
          </Box>
          <Box display="flex" justifyContent="center" alignContent="center">
            <div onClick={onImageClick}>
              <Avatar
                size="xl"
                src={previewURL}
                // src={`${SERVER_URL}${inputMember.mem_profile}`}
                name={inputMember.mem_name}
              />
            </div>
            <input
              type="file"
              name="imgFile"
              id="imgFile"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleFileOnChange}
            />
          </Box>
          <Box>
            <Text inline weight="bold">
              {inputMember.mem_name} 님,
            </Text>
            <Text inline size="sm">
              &nbsp; 반갑습니다.
            </Text>
          </Box>
          <TextField
            id="id"
            disabled
            value={inputMember.mem_id}
            onChange={() => {}}
          />
          <div
            className={
              failValidationList.includes("password") ? "shake-horizontal" : ""
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
          <TextField
            id="name"
            disabled
            value={inputMember.mem_name}
            onChange={() => {}}
          />
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
          <TextField
            id="birth"
            type="date"
            placeholder="생년월일을 입력하세요."
            value={inputMember.mem_birth || ""}
            //value="2020-08-13"
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
              <Box paddingX={1} paddingY={1}>
                <Button text="Save" color="red" size="lg" onClick={modifyBtn} />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default MemberForm;
