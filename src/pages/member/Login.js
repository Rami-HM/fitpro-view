import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios/axios";
import { setSessionToken } from "../../actions/session/session";
import { Encrypt } from "../../actions/crypto";
import { redirect } from "../../util/router";
import {
  Box,
  TextField,
  Button,
  Heading,
  Text,
  CompositeZIndex,
  FixedZIndex,
  Layer,
} from "gestalt";
import LoginImg from "../../resource/image/login.png";
import Register from "./Register";

import { ALERT_TITLE } from "../../config/constants/commonConts";
import Alert from "../../component/common/Alert";

//redux
import { useDispatch } from "react-redux";
import { actionCreators as memberAction } from "../../redux/modules/member";

import {
  validation,
  resetValiFields,
  getFailValidationList,
  handleValidation,
} from "../../actions/validation/validation";

function Login(props) {
  const [member, setMember] = useState({
    mem_id: "",
    mem_pwd: "",
  });

  const [shouldShow, setShouldShow] = React.useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const [contents, setContents] = useState("");

  const [failValidationList, setFailValidationList] = useState([]);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const dispatch = useDispatch();

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    if (failValidationList.length !== 0) {
      setTimeout(() => {
        setFailValidationList([]);
      }, 1500);
    }
  }, [failValidationList]);

  const resetForm = () => {
    setMember({
      mem_id: "",
      mem_pwd: "",
    });
    resetValiFields();
  };

  const showRegister = () => {
    resetForm();
    setShouldShow(true);
  };

  const handleChange = (field) => (e) => {
    const value = e.value;

    setMember((prevInputUser) => {
      return {
        ...prevInputUser,
        [field]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // submit 막기

    // const enPwd = Encrypt(member.mem_id, member.mem_pwd);
    // console.log(enPwd);

    const list = await getFailValidationList();
    
    if (list.length !== 0) {
      setFailValidationList(list);
      return;
    }

    await axios({
      method: "POST",
      url: "/login",
      data: member,
    }).then((response) => {
      if (response.isSuc) {
        setSessionToken(response);
        //setSessionUser(response);
        redirect(props, "/");
      } else {
        setContents(response.data.error);
        //setIsAlert(true);
      }
    });
  };

  const onDismissAlert = () => {
    setIsAlert(false);
  };

  return (
    <>
      {isAlert ? (
        <Alert
          onDismiss={onDismissAlert}
          title={ALERT_TITLE}
          contents={contents}
        />
      ) : (
        ""
      )}
      <div style={{ backgroundColor: "rgb(207, 212, 247)" }}>
        <Box column={12} height="100vh">
          <Box height="100%" display="flex">
            <Box column={6} style={{ position: "relative" }}>
              <div style={{ position: "absolute", bottom: "5vh", left: "0" }}>
                <img src={LoginImg} style={{ width: "40vw" }} />
              </div>
            </Box>
            <Box
              column={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit}>
                <Box column={12} marginBottom={5}>
                  <Heading size="lg">FITPRO</Heading>
                  <Text size="sm">
                    이제부터, 여러분들의 프로젝트 일정을 공유하고 관리해 보세요!
                  </Text>
                </Box>
                <Box column={12} marginBottom={5} minWidth="30vw">
                  <Box marginBottom={3}>
                    <div
                      className={
                        failValidationList.includes("id")
                          ? "shake-horizontal"
                          : ""
                      }
                    >
                      <TextField
                        size="lg"
                        id="userId"
                        errorMessage={handleValidation(
                          member,
                          "id",
                          "mem_id",
                          true
                        )}
                        onChange={handleChange("mem_id")}
                        placeholder="아이디를 입력 해 주세요"
                        label="id"
                        value={member.mem_id || ""}
                        type="text"
                      />
                    </div>
                  </Box>
                  <Box>
                    <div
                      className={
                        failValidationList.includes("password")
                          ? "shake-horizontal"
                          : ""
                      }
                    >
                      <TextField
                        size="lg"
                        id="password"
                        errorMessage={handleValidation(
                          member,
                          "password",
                          "mem_pwd",
                          true
                        )}
                        onChange={handleChange("mem_pwd")}
                        label="password"
                        placeholder="비밀번호를 입력 해 주세요"
                        value={member.mem_pwd || ""}
                        type="password"
                      />
                    </div>
                  </Box>
                </Box>

                <Box column={12}>
                  <Box marginBottom={3}>
                    <span className="btn-chd-login">
                      <Button
                        size="lg"
                        text="Sign In"
                        fullWidth
                        type="submit"
                        color="transparentWhiteText"
                      />
                    </span>
                  </Box>
                  <Box>
                    <Button
                      size="lg"
                      text="Sign Up"
                      fullWidth
                      type="button"
                      color="gray"
                      onClick={() => showRegister(true)}
                    />
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </div>
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <Register onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </>
  );
}

export default Login;
