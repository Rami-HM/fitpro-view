import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Box, Flex } from "gestalt";
import "gestalt/dist/gestalt.css";
import  {useSelector} from 'react-redux';

function Layout({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  const member = useSelector(state => state.member.member);


  useEffect(() => {
    console.log('member',member);
    if(member)
      setIsLogin(true);
  }, [member])

  return (
    <Box display="flex">
      <Box>
        <SideMenu></SideMenu>
      </Box>
      <Box column={12}>
        <Box height={50}>
          <div className ="headerBar">
            <Flex justifyContent="start" alignItems="center" height="100%">
              <Header></Header>
            </Flex>
          </div>
        </Box>
        <Box>
          <Box padding={7}>
            {
              isLogin ? children : <></>
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
