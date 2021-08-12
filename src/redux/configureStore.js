import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory as createHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./modules/user";
import member from "./modules/member";

const env = process.env.NODE_ENV;
//alert(env);

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
  user,
  member,
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
