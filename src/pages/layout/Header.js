import React, { useState } from "react";
import { Box, Heading, Text, Flex, Avatar, Link } from "gestalt";
import "../../resource/css/header.css";
import { SERVER_URL } from "../../config/constants/commonConts";
import MemberModal from "../member/MemberModal";

function Header() {
  const [isModal, setIsModal] = useState(false);

  const onDismiss = () => {
    setIsModal(false);
  };

  return (
    <>
      {isModal ? (
        <MemberModal onDismiss={onDismiss} mode={"Modify"} />
      ) : (
        <Flex alignItems="center" justifyContent="center" gap={3} width="100%">
          <Flex.Item flex="grow">
            <Heading size="sm" color="white"></Heading>
          </Flex.Item>
          <Flex.Item minWidth="10vw">
            <Link onClick={() => setIsModal(true)} href="#">
              <Flex gap={2} justifyContent="center" alignItems="center">
                <Flex.Item>
                  <Avatar
                    size="sm"
                    src={`${SERVER_URL}/uploads/13d9a794-dbdb-4e3a-9d71-41f66034d769.png`}
                    name="____"
                  />
                </Flex.Item>
                <Flex.Item>
                  <Text size="sm" color="white">
                    _____님 반갑습니다!
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
