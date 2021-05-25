import { createStore, combineReducers } from "redux";
import taskReducer from "./redux/taskReducer";

const reducers = combineReducers({
  tasksData: taskReducer,
});

const store = createStore(reducers);

export default store;
