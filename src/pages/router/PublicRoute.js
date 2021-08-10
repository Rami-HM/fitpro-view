import { React, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Layout from "../layout/Layout";

// function PrivateRoute(props,{...rest}) {
function PublicRoute({ component: Component, ...rest }) {
  const [nomalLayout, setNomalLayout] = useState(rest.nomalLayout);

  return (
    <Route
      {...rest}
      render={(props) =>
        nomalLayout ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PublicRoute;
