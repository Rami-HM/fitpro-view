import axios from "axios";
import { getSessionToken, logout } from "../../actions/session/session";
import { SERVER_URL } from "../constants/commonConts";
import store from '../../redux/configureStore';
import {actionCreators as ToastAction} from '../../redux/modules/toast';
/*
    axios 인스턴스를 생성합니다.
    생성할때 사용하는 옵션들 (baseURL, timeout, headers 등)은 다음 URL에서 확인할 수 있습니다.
    https://github.com/axios/axios 의 Request Config 챕터 확인
*/
const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
/*
1. 요청 인터셉터를 작성합니다.
2개의 콜백 함수를 받습니다.

1) 요청 바로 직전 - 인자값: axios config
2) 요청 에러 - 인자값: error
*/

instance.interceptors.request.use(
  async function(config) {
    document.body.classList.add("loading-indicator");
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    const tokenValue = await getSessionToken();

    config.headers["Authorization"] = tokenValue; // 모든 api 요청에 localstorage 에 저장된 토큰을 포함하여 전송

    return config;
  },
  function(error) {
    document.body.classList.remove("loading-indicator");
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

// /*
//     2. 응답 인터셉터를 작성합니다.
//     2개의 콜백 함수를 받습니다.

//     1) 응답 정성 - 인자값: http response
//     2) 응답 에러 - 인자값: http error
// */
instance.interceptors.response.use(
  async function(response) {
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다. 
        .then() 으로 이어집니다.
    */

    //모든 응답은 200으로 도착하며,
    //오류 일 시 해당 data안에 statusCode 를 포함하여 보냄.

    //결과 값이 200이 아닌 값으로 넘어 온 경우
    console.log(response);
    let data = response.data;
    let isSuc = false;

    if (data.statusCode === 401)
      // token 만료
      logout();

    if (data.statusCode || response.status >= 400) {
      data = await {
        ...data,
        error: data.error ? data.error : "오류가 발생하였습니다.",
      };
      store.dispatch(ToastAction.showToast(data.error ? data.error : "오류가 발생하였습니다."));
      //   alert(data.error);
      //   const path = history.location.pathname;
      //   redirect(path);
    } else {
      isSuc = true;
      //data = await {...data,statusCode : response.status}
    }
    response = await { ...response, data, isSuc };
    document.body.classList.remove("loading-indicator");
    return response;
  },

  function(error) {
    document.body.classList.remove("loading-indicator");
    /*
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.    
    */
    return Promise.reject(error);
  }
);

// 생성한 인스턴스를 익스포트 합니다.
export default instance;
