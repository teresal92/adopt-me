import { combineReducers } from "redux";
import location from "./location";
import animal from "./animal";
import breed from "./breed";
import theme from "./theme";

// helper function that creates a root reducer that will delegate
// all changed to the location key to this reducer
export default combineReducers({
  location,
  animal,
  breed,
  theme,
});
