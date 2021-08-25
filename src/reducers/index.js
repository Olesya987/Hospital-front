import { combineReducers } from "redux";
import authReg from "./authReg";
import data from "./data";
import state from "./state";
import values from "./values";
import flag from "./flag";
import characters from "./characters";
import date from "./date";
import isFilter from "./isFilter";
import sortItem from "./sortItem";
import modalProps from "./modalProps";

export default combineReducers({
  authReg,
  data,
  state,
  values,
  flag,
  characters,
  date,
  isFilter,
  sortItem,
  modalProps,
});
