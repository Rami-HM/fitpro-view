import React, { useState } from "react";
import { Box,Icon,Image} from "gestalt";
import "../../resource/css/sidebar.css";
import Logo from "../../resource/image/FITPRO.gif";

function SideMenu(props) {

  return (
    <>
      <div className="sideNav">
        <div className="sideNavBox">
          <button className="row" id="home">
            <div className="icon icon-transparent">
              <Image src={Logo} 
              alt = "fitpro Logo"
              naturalHeight = {100}
              naturalWidth = {100}
              />
            </div>
            <h2 className="sideNavText">Home</h2>
          </button>
          <button className="row">
            <div className="icon" />
            <h2 className="sideNavText">Following</h2>
          </button>
          <button className="row">
            <div className="icon" />
            <h2 className="sideNavText">Explore</h2>
          </button>
          <button className="row">
            <div className="icon"/>
            <h2 className="sideNavText">Profile</h2>
          </button>
          <div className="divider" />
          <button className="row">
            <div className="icon" />
            <h2 className="sideNavText">Projects</h2>
          </button>
          <button className="row">
            <div className="icon" />
            <h2 className="sideNavText">Wedding Photography</h2>
          </button>
          <button className="row">
            <div className="icon">
              <img src="https://picsum.photos/200/300/?random" />
            </div>
            <h2 className="sideNavText">New Life Recipes</h2>
          </button>
        </div>
      </div>
    </>
  );
}

export default SideMenu;
