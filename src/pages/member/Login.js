import React from "react";
import { useState } from "react";
import axios from "../../config/axios/axios";
import { setSessionToken, setSessionUser } from "../../actions/session/session";
import { Encrypt } from "../../actions/crypto";
import { redirect } from "../../util/router";
import { Box, TextField, Button, Heading, Text,CompositeZIndex, FixedZIndex, Layer,  } from "gestalt";
import LoginImg from "../../resource/image/login.png";
import Register from "./Register";

function Login() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [shouldShow, setShouldShow] = React.useState(false);


  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // submit 막기

    axios({
      method: "POST",
      url: "/login",
      data: JSON.stringify({
        userId: userId,
        password: Encrypt(password),
      }),
    }).then((response) => {
      if (response.isSuc) {
        setSessionToken(response);
        setSessionUser(response);
        redirect("/");
      } else {
      }
    });
  };

  return (
    <>
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
                  <TextField
                    size ="lg"
                    id="userId"
                    onChange={({ value }) => setUserId(value)}
                    placeholder="아이디를 입력 해 주세요"
                    label="id"
                    value={userId}
                    type="text"
                  />
                </Box>
                <Box>
                  <TextField
                    size="lg"
                    id="password"
                    onChange={({ value }) => setPassword(value)}
                    label="password"
                    placeholder="비밀번호를 입력 해 주세요"
                    value={password}
                    type="password"
                  />
                  </Box>
                </Box>

                <Box column={12}>
                  <Box marginBottom = {3}>
                  <span  className="btn-chd-login">
                  <Button size="lg" text="Sign In" fullWidth type="submit" color ="transparentWhiteText" />
                  </span>
                  </Box>
                  <Box>
                  <Button size="lg" text="Sign Up" fullWidth type="button" color="gray" onClick={() => setShouldShow(true)} />
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
