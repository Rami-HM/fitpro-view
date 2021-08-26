import axios from "../../config/axios/axios";
import { useSelector } from "react-redux";

export async function isSessionToken() {
  let result = {};
  //axios 로 api 호출 후 유효토큰인지 확인
  await axios({
    method: "GET",
    url: "/checkToken",
  }).then((res) => {
    if (res.isSuc) {
      result = res.data;
    } else {
      deleteSession("accessToken");
      console.log(res.data.error);
      window.location.href = "/";
    }
  });
  return result;
}

export async function logout() {
  deleteSession("accessToken");
  window.location.href = "/";
}

export async function setSessionToken(response) {
  await localStorage.setItem("accessToken", response.data["accessToken"]);
}

export async function setSessionUser(response) {
  await localStorage.setItem("user", JSON.stringify(response.data["user"]));
}

export function getSessionToken() {
  return localStorage.getItem("accessToken");
}
export function getSessionUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function deleteSession(key) {
  await localStorage.removeItem(key);
}
