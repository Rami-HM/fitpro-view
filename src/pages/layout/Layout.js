import React, { useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Box, Flex } from "gestalt";
import "gestalt/dist/gestalt.css";

function Layout({ children }) {
  return (
    <Box display="flex">
      <Box>
        <SideMenu></SideMenu>
      </Box>
      <Box column={12}>
        {/* <div style={{"zIndex":"-999999","backgroundColor":"yellow","height":"50px", "paddingLeft" : "10px","paddingRight" : "10px"}} > */}
        <Box height={50}>
          {/* <div
            style={{
              backgroundColor: "#615fb9",
              width: "100%",
              height: "100%",
            }}
          > */}
          <div className ="headerBar">
            <Flex justifyContent="start" alignItems="center" height="100%">
              <Header></Header>
            </Flex>
          </div>
        </Box>

        {/* </div> */}
        <Box>
          <Box padding={7}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
