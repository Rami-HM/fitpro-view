import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./member/Login";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import LoginRoute from "./router/LoginRoute";
import Upload from "./Upload";
import Project from "./project/Project";
import ProjectTask from "./task/ProjectTask";
import Task from "./task/Task";
import Calendar from "./calendar/Calendar";
import GanttTask from "./gantt/GanttTask";

import Toast from '../component/common/Toast';

import "../base.css";

function App() {

  return (
    <>
    <Toast />
    <Switch>
      <PrivateRoute exact nomalLayout path="/" component={Dashboard} />
      <PrivateRoute exact nomalLayout path="/project" component={Project} />
      <PrivateRoute
        exact
        nomalLayout
        path="/project/task"
        component={ProjectTask}
      />
      <PrivateRoute exact nomalLayout path="/task" component={Task} />
      <PrivateRoute exact nomalLayout path="/calendar" component={Calendar} />
      <PrivateRoute exact nomalLayout path="/gantt" component={GanttTask} />
      <LoginRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/upload" component={Upload} />
      <PublicRoute component={() => "Not Found"} />
    </Switch>
    </>
  );
}
export default App;
