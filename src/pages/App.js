import { Route, Switch } from "react-router-dom";
import Login from "./member/Login";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import LoginRoute from "./router/LoginRoute";
import Upload from "./Upload";
import Project from "./project/Project";
import Task from "./task/Task";

import "../base.css"

function App() {
  return (

    <Switch>
      <PrivateRoute exact nomalLayout path="/" component={Dashboard} />
      <PrivateRoute exact nomalLayout path="/project" component={Project} />
      <PrivateRoute exact nomalLayout path="/task" component={Task} />
      <LoginRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/upload" component={Upload} />
      <PublicRoute component={() => "Not Found"} />
    </Switch>
  );
}

export default App;
