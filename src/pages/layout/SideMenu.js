import React, { useState } from "react";
import { Image, Icon } from "gestalt";
import "../../resource/css/sidebar.css";
import Logo from "../../resource/image/FITPRO.gif";
import Mytask from "../../resource/image/menu/mytask.svg";
import Project from "../../resource/image/menu/project-management-svg-svg.svg";
import Task from "../../resource/image/menu/task.svg";
import Calendar from "../../resource/image/menu/calendar.svg";
import Gantt from "../../resource/image/menu/gantt-chart.svg";
import { Link } from "react-router-dom";

function SideMenu(props) {
  return (
    <>
      <div className="sideNav">
        <div className="sideNavBox">
          <Link to="/">
            <button className="row" id="home">
              <div className="icon icon-transparent">
                <Image
                  src={Logo}
                  alt="fitpro Logo"
                  naturalHeight={100}
                  naturalWidth={100}
                />
              </div>
              <h2 className="sideNavText">FITPRO</h2>
            </button>
          </Link>
          <Link to="/project">
            <button className="row">
              <div className="icon icon-transparent">
                <Image
                  src={Project}
                  alt="fitpro Logo"
                  naturalHeight={100}
                  naturalWidth={100}
                />
              </div>
              <h2 className="sideNavText">Project</h2>
            </button>
          </Link>
          <Link to="/project/task">
            <button className="row">
              <div className="icon icon-transparent">
                <Image
                  src={Task}
                  alt="fitpro Logo"
                  naturalHeight={100}
                  naturalWidth={100}
                />
              </div>
              <h2 className="sideNavText">Task</h2>
            </button>
          </Link>
          <Link to="/task">
            <button className="row">
              <div className="icon  icon-transparent">
                <Image
                  src={Mytask}
                  alt="fitpro Logo"
                  naturalHeight={100}
                  naturalWidth={100}
                />
              </div>
              <h2 className="sideNavText">My Task</h2>
            </button>
          </Link>
          <div className="divider" />
          <Link to="/calendar">
            <button className="row">
              <div className="icon icon-transparent">
                <Image
                  src={Calendar}
                  alt="fitpro Logo"
                  naturalHeight={100}
                  naturalWidth={100}
                />
              </div>
              <h2 className="sideNavText">Calendar</h2>
            </button>
          </Link>
          <Link to="/gantt">
            <button className="row">
              <div className="icon  icon-transparent">
                <Image
                  src={Gantt}
                  alt="fitpro Logo"
                  naturalHeight={100}
                  naturalWidth={100}
                />
              </div>
              <h2 className="sideNavText">Gantt</h2>
            </button>
          </Link>
          {/* <button className="row">
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
          </button> */}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
