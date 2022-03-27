import { combineReducers } from "redux";
import wallet from "./wallet";
import user from './user'

export default combineReducers({
  wallet,
  user
});
