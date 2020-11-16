import { combineReducers } from "redux";
import auth from "./auth";
import post from "./post";
import rerender from "./rerender";

const rootReducer = combineReducers({
  auth,
  post,
  rerender,
});

export default rootReducer;
