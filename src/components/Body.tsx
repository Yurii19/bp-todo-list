import React, { useCallback, useState } from "react";
import Task from "./Task";
import FormAdd from "./FormAdd";
import { useSelector } from "react-redux";
import { ITaskProps } from "./Task";

const Body = () => {
  const localData = useSelector((state: any) => state.tasksData);
  const [isModal, setisModal] = useState(false);
  const [filter, setFilter] = useState("all");

  let transitData = localData.tasks;
  if (filter === "done") {
    transitData = localData.tasks.filter((el: ITaskProps) => el.isDone);
  }
  if (filter === "exp") {
    transitData = localData.tasks.filter((el: ITaskProps) => !el.isDone);
  }
  if (filter === "all") {
    transitData;
  }

  const tasksSet = transitData.map((el: ITaskProps, i: number) => {
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

  const selectFilter = useCallback(
    (ev) => {
      const value = ev.target.value;
      setFilter(value);
    },
    [filter]
  );

  return (
    <div>
      <h2>To do list app </h2>
      <button className="add-new-task" onClick={addNewTask}>
        Add new task{" "}
        <span className="add-sign">
          {isModal && "-"}
          {!isModal && "+"}
        </span>
      </button>
      {isModal && <FormAdd dataSize={localData.tasks.length} />}

      <div className="tasks-container">
        selsect type
        <div className="body-controls">
          <label className="select-filter">
            All
            <input
              type="radio"
              name="taskType"
              value="all"
              {...(filter === "all" ? "checked" : "")}
              onClick={selectFilter}
            />
          </label>
          <label className="select-filter">
            Done
            <input
              type="radio"
              name="taskType"
              value="done"
              onClick={selectFilter}
            />
          </label>
          <label className="select-filter">
            Inprogress
            <input
              type="radio"
              name="taskType"
              value="exp"
              onClick={selectFilter}
            />
          </label>
        </div>
        {tasksSet}
      </div>
    </div>
  );
};

export default Body;
