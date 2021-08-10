import { React, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";

// function PrivateRoute(props,{...rest}) {
function PrivateRoute({ component: Component, ...rest }) {

  const [nomalLayout, setNomalLayout] = useState(rest.nomalLayout);

  return (
    <Route
      {...rest}
      render={
        (props) =>
          // 레이아웃을 사용 하는 경우 : nomalLayout
        (localStorage.getItem('accessToken') //&& sessionStorage.getItem('user')
        )?(
            <PublicRoute nomalLayout={nomalLayout} component={Component} {...props} />
        ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}}
            />
        )
      }
    />
  );
}

export default PrivateRoute;
