import { Status } from "gestalt";

export const classImport = (import_desc) => {
  let colorClass = "";
  switch (import_desc) {
    case "매우높음":
      colorClass = "txt-red";
      break;
    case "높음":
      colorClass = "txt-orange";
      break;
    case "중간":
      colorClass = "txt-green";
      break;
    case "낮음":
      colorClass = "txt-blue";
      break;
    default:
      break;
  }

  return <span className={colorClass}>{import_desc}</span>;
};

export const classState = (state) => {
  let info = {
    type: "unstarted",
    msg: "",
  };
  switch (state) {
    case "SH":
        info = {type:"unstarted", msg: "예정됨"}
    break;
    case "PG":
        info = {type:"inProgress", msg: "진행중"}
    break;
    case "PD":
        info = {type:"halted", msg: "보류"}
    break;
    case "CP":
        info = {type:"ok", msg: "완료됨"}
    break;
    case "FL":
        info = {type:"canceled", msg: "미처리"}
    break;
    default:
      break;
  }

  return <Status type={info.type} title={info.msg}/>;
};

export const convertMinutes = (num) =>{
  let d = Math.floor(num/1440); // 60*24
  let h = Math.floor((num-(d*1440))/60);
  let m = Math.round(num%60);

  return (d>0 ? d+ "일 " : "") + (h>0 ? h+ "시간 " : "") + (m>0 ? m+ "분 " : "");
}