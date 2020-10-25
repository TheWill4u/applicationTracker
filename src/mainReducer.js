import { combineReducers } from "redux";
import Board from "./boardFeature/boardSlice";

const mainReducer = combineReducers({
  Board
});

export default mainReducer;
