import { React } from "react";
import { Redirect, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";

// function PrivateRoute(props,{...rest}) {
function LoginRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        // 로그인 정보가 있을 시 login 주소 접근 불가
        (localStorage.getItem('accessToken') //&& sessionStorage.getItem('user')
        )?(
            <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        ) : (
            <PublicRoute nomalLayout={false} component={Component} {...props} />
        )
      }
    />
  );
}

export default LoginRoute;
