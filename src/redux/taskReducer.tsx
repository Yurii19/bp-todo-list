const ADD_TASK = "ADD_TASK";
const MARK_TASK = "MARK_TASK";
const DELETE_TASK = "DELETE_TASK";
const RETURN_TASK = "RETURN_TASK";

import { ITaskProps } from "../components/Task";

export interface IAction {
  type: string;
  payload: any;
}

const initialState = {
  tasks: [
    {
      id: 0,
      name: "Initial name",
      description: "Here is a task",
      deadline: "2023-05-10",
      isDone: false,
    },
    {
      id: 1,
      name: "Make the test",
      description: "Have to do it till thurthday tonight",
      deadline: "2021-05-27",
      isDone: false,
    },
    {
      id: 2,
      name: "Feedback",
      description: "Send message to client",
      deadline: "2021-05-27",
      isDone: true,
    },
  ],
};

function taskReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case MARK_TASK: {
      const target = state.tasks.find((el) => el.id === action.payload);
      if (target) {
        const index = state.tasks.indexOf(target);
        const newTasks = state.tasks.slice();
        newTasks[index].isDone = true;
        return { ...state, tasks: [...newTasks] };
      } else {
        return state;
      }
    }
    case RETURN_TASK: {
      const target = state.tasks.find((el) => el.id === action.payload);
      if (target) {
        const index = state.tasks.indexOf(target);
        const newTasks = state.tasks.slice();
        newTasks[index].isDone = false;
        return { ...state, tasks: [...newTasks] };
      } else {
        return state;
      }
    }
    case DELETE_TASK: {
      const newTasks = state.tasks.filter((el) => el.id !== action.payload);
      return { ...state, tasks: [...newTasks] };
    }

    default:
      return state;
  }
}

export const addTaskAC = (payload: ITaskProps) => ({ type: ADD_TASK, payload });
export const markTaskAC = (payload: number) => ({ type: MARK_TASK, payload });
export const deleteTaskAC = (payload: number) => ({
  type: DELETE_TASK,
  payload,
});
export const returnTaskAC = (payload: number) => ({
  type: RETURN_TASK,
  payload,
});

export default taskReducer;
