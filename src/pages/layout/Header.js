import React, { useState, useEffect } from "react";
import { Box, Image, Heading, Text, Flex, Avatar, Link } from "gestalt";
import "../../resource/css/header.css";
import { SERVER_URL } from "../../config/constants/commonConts";
import MemberModal from "../member/MemberModal";
import { useSelector } from "react-redux";
import { isSessionToken, logout } from "../../actions/session/session";
import noImage from "../../resource/image/noImage.png";
import fitpro from "../../resource/image/FITPRO_text_logo.png";
import axios from "../../config/axios/axios";
//redux
import { useDispatch } from "react-redux";
import { actionCreators as memberAction } from "../../redux/modules/member";
import { actionCreators as projectAction } from "../../redux/modules/project";

const initMember = {
  mem_id: "",
  mem_pwd: "",
  mem_name: "",
  mem_email: "",
  mem_birth: "",
  mem_affil: "",
  mem_profile: "",
};

function Header(props) {
  const [isModal, setIsModal] = useState(false);
  const memberInfo = useSelector((state) => state.member.member);
  const projectList = useSelector((state) => state.project.projectList);
  const dispatch = useDispatch();

  useEffect(() => {
    //token 만료 여부
    if (JSON.stringify(memberInfo) === "{}") {
      getMemberInfo();
    }

    return () => {
      setIsModal(false);
    };
  }, []);

  const getMemberInfo = async () => {
    // const member = await isSessionToken();
    let member = {};
    await axios({
      method: "GET",
      url: "/checkToken",
    }).then((res) => {
      if (res.isSuc) {
        member = res.data;
        dispatch(memberAction.setMember(member));
        if (projectList.length === 0) {
          getProjectListAPI(member);
        }
      } else {
        logout();
      }
    });

  };

  const getProjectListAPI = async (member) => {
    try {
      await axios({
        method: "GET",
        url: "/project/list/" + member.mem_idx,
      }).then((res) => {
        if (res.data.length > 0) {
          dispatch(projectAction.setProjectList(res.data));
          projectDetail(res.data[0].prj_idx);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const projectDetail = async(prj_idx) => {
    try {
      dispatch(projectAction.getProject(prj_idx));
    } catch (error) {
      console.log(error);
    }
  };

  const onDismiss = () => {
    setIsModal(false);
  };

  return (
    <>
      {isModal ? (
        <MemberModal onDismiss={onDismiss} mode={"Modify"} />
      ) : (
        <Flex alignItems="center" justifyContent="center" gap={3} width="100%" >
          <Flex.Item flex="grow" >
            <Box marginStart={4}>

            <Heading size="sm" color="white">FITPRO</Heading>
            </Box>
          </Flex.Item>
          <Flex.Item minWidth="10vw">
            <Link onClick={() => setIsModal(true)} href="#">
              <Flex gap={2} justifyContent="center" alignItems="center">
                <Flex.Item>
                  <Avatar
                    size="sm"
                    src={
                      memberInfo.mem_profile
                        ? `${SERVER_URL}${memberInfo.mem_profile}`
                        : noImage
                    }
                    name={memberInfo.mem_name || ""}
                  />
                </Flex.Item>
                <Flex.Item>
                  <Text size="sm" color="white">
                    {memberInfo.mem_name}님 반갑습니다!
                  </Text>
                </Flex.Item>
              </Flex>
            </Link>
          </Flex.Item>
        </Flex>
      )}
    </>
  );
}

export default Header;
