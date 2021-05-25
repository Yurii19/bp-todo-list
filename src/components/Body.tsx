import React, { useCallback, useState } from "react";
import Task from "./Task";
import FormAdd from "./FormAdd";
import { useDispatch, useSelector } from "react-redux";
import { ITaskProps } from "./Task";

const Body = () => {
  const localData = useSelector((state: any) => state.tasksData);
  const [isModal, setisModal] = useState(false);

  const tasksSet = localData.tasks.map((el: ITaskProps, i: number) => {
    return (
      <Task
        id={el.id}
        name={el.name}
        description={el.description}
        deadline={el.deadline}
        isDone={el.isDone}
        key={el.name + i}
      />
    );
  });

  const addNewTask = useCallback(() => {
    setisModal(!isModal);
  }, [isModal]);

  return (
    <div>
      <h4>this is my to do list app </h4>
      <button className="add-new-task" onClick={addNewTask}>
        Add new task{" "}
        <span className="add-sign">
          {isModal && "-"}
          {!isModal && "+"}
        </span>
      </button>
      {isModal && <FormAdd dataSize={localData.tasks.length - 1} />}
      {tasksSet}
    </div>
  );
};

export default Body;
