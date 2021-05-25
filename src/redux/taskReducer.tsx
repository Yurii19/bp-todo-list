const ADD_TASK = "ADD_TASK";
import { ITaskProps } from "../components/Task";

export interface IAction {
  type: string;
  payload: ITaskProps;
}

const initialState = {
  tasks: [
    {
      name: "Initial name",
      description: "Here is a task",
      deadline: "10 June",
      isDone: false,
    },
  ],
 // articlesSelected: null,
};

function taskReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case ADD_TASK:
    //  // console.log(state)
    //    //const temp = [...state.tasks, action.payload];
    //    console.log(state.tasks);
    //    console.log(action.payload);
    //   // const newState = { tasks: temp}
      return {...state, tasks:  [...state.tasks, action.payload]};
    default:
      return state;
  }
}

export const addTaskAC = (payload: ITaskProps) => ({ type: ADD_TASK, payload: payload });
export default taskReducer;
