import React from 'react';
export interface ITaskProps {
  id:number;
  name: string;
  description: string;
  deadline: string;
  isDone: boolean;
}

const Task = (props: ITaskProps) => {
  return (
    <div className="task-container">
      <span>{props.name}</span>
      <p>{props.description}</p>
      <i>{props.deadline}</i>
    </div>
  );
};

export default Task;
