import React from "react";
import { Status } from "gestalt";
import { useSelector } from "react-redux";

function ProjcetStatus(props) {

  const {sDate,eDate} = props; 

  const project = useSelector((state) => state.project.project);

  const start_date = sDate ? new Date(sDate) : new Date(project.prj_start);
  const end_date = eDate ? new Date(eDate) : new Date(project.prj_end);

  let info = {
    type: "unstarted",
    day: "",
    msg: "",
  };

  if (new Date() < start_date)
    info = {
      type: "unstarted",
      day:
        Math.round(
          (start_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        ) + "일 뒤 시작",
      msg: "예정됨",
    };
  else if (start_date <= new Date() && new Date() < end_date)
    info = {
      type: "inProgress",
      day:
        Math.round(
          (end_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        ) + "일 남음",
      msg: "진행중",
    };
  else if (end_date <= new Date())
    info = {
      type: "ok",
      day: "",
      msg: "완료됨",
    };

  return <Status type={info.type} title={info.msg} subtext={info.day} />;
}

export default ProjcetStatus;
