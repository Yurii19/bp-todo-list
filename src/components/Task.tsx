import React, { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";

export interface ITaskProps {
  id: number;
  name: string;
  description: string;
  deadline: string;
  isDone: boolean;
}

const Task = (props: ITaskProps) => {
  const taskRef = useRef<HTMLDivElement>(null);
  const dispatchMarkTask = useDispatch();

  const markTask = useCallback(() => {
    console.log(props.isDone)
    if(!props.isDone){
      dispatchMarkTask({ type: "MARK_TASK", payload: props.id });
    }
    if(props.isDone){
      dispatchMarkTask({ type: "RETURN_TASK", payload: props.id });
    }
  }, [props.isDone]);

  const deleteTask = useCallback(() => {
      dispatchMarkTask({ type: "DELETE_TASK", payload: props.id });
   
  }, []);
  return (
    <div
      className={props.isDone ? "task-done task-container" : "task-container"}
      ref={taskRef}
    >
      <div className="task-header">
        <div className="task-controls">
          <button
            onClick={markTask}
            className={props.isDone ? "button-task-done" : ""}
          >
            {props.isDone ? "return" : "to do"}
          </button>
          <button onClick={deleteTask}>delete</button>
        </div>
        <span>{props.name}</span>
      </div>
      <p>{props.description}</p>
      <i>{props.deadline}</i>
    </div>
  );
};

export default Task;
