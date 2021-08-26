import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory as createHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import member from "./modules/member";
import project from "./modules/project";
import fail from "./modules/fail";
import toast from "./modules/toast";

const env = process.env.NODE_ENV;

// history 생성
const history = createHistory();

// middlewares
const middlewares = [thunk, routerMiddleware(history)];

// 개발환경일때 redux-logger 활성화
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  router: connectRouter(history),
  member,
  project,
  fail,
  toast,
});

let store;
if (env === "development") {
  store = (initialState) =>
    createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares))
    );
} else {
  store = (initialState) =>
    createStore(reducer, initialState, applyMiddleware(...middlewares));
}

export { history };
export default store();
