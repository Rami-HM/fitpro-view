import React, { useEffect } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Box, Flex } from "gestalt";
import "gestalt/dist/gestalt.css";

function Layout({ children }) {
  useEffect(()=>{
  },[]);
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
          <Box padding={7}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
