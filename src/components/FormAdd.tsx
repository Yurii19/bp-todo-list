import React, { FormEvent, useState, useCallback, useRef } from "react";
import { ITaskProps } from "./Task";
import { useDispatch, useSelector } from "react-redux";

// export interface ITaskProps {
//   name: string;
//   description: string;
//   deadline: string;
//   isDone: boolean;
// }
interface IFormProps {
  dataSize: number;
}

const FormAdd = (props: IFormProps) => {
  console.log(props);
  const [taskName, setName] = useState("");
  const [taskDesk, setDesk] = useState("");
  const [taskDeadline, setDeadline] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const dispatchAddTask = useDispatch();

  const inputName = useCallback(
    (ev: FormEvent<HTMLInputElement>) => {
      setName(ev.currentTarget.value);
    },
    [taskName]
  );
  const inputDescription = useCallback(
    (ev: FormEvent<HTMLTextAreaElement>) => {
      setDesk(ev.currentTarget.value);
    },
    [taskDesk]
  );

  const inputDate = useCallback(
    (ev: FormEvent<HTMLInputElement>) => {
      setDeadline(ev.currentTarget.value);
      // console.log(' -> '+ev.currentTarget.value)
    },
    [taskDeadline]
  );

  const remowErrorStyle = useCallback(
    (ev: FormEvent<HTMLInputElement>) => {
      const modalContainer = formRef.current;
      if (modalContainer) {
        modalContainer.classList.remove("fail");
      }

      // console.log(' -> '+ev.currentTarget.value)
    },
    [taskDeadline]
  );

  const makeTask = useCallback(() => {
    // const newTask: ITaskProps = {
    //   name: "...",
    //   description: "...",
    //   deadline: "...",
    //   isDone: false,
    // };

    //  const isDataValid = taskName && taskDesk && taskDeadline;

    const modalContainer = formRef.current;
    console.log("- ");
    if (modalContainer && (!taskName || !taskDesk || !taskDeadline)) {
      modalContainer.classList.add("fail");
    }

    if (taskName && taskDesk && taskDeadline) {
      //console.log(`${taskName} -> ${taskDesk} -> ${taskDeadline}`);
      //const id =
      const newTask: ITaskProps = {
        id: 1,
        name: taskName,
        description: taskDesk,
        deadline: taskDeadline,
        isDone: false,
      };
      dispatchAddTask({ type: "ADD_TASK", payload: newTask });
    }
  }, [taskName, taskDesk, taskDeadline]);
  // const makeTask = () => {
  //   const newTask: ITaskProps = {
  //     name: "...",
  //     description: "...",
  //     deadline: "...",
  //     isDone: false,
  //   };

  //   //  const isDataValid = taskName && taskDesk && taskDeadline;

  //   const modalContainer = formRef.current;
  //   console.log("- ");
  //   if (modalContainer && (!taskName || !taskDesk || !taskDeadline)) {
  //     modalContainer.classList.add("fail");
  //   }

  //   if (taskName && taskDesk && taskDeadline) {
  //     console.log(`${taskName} -> ${taskDesk} -> ${taskDeadline}`);
  //   }
  // };

  return (
    <div className="modal-container" ref={formRef}>
      <span>Input values</span>
      <label className="label-wrapper">
        Name
        <input type="text" value={taskName} onChange={inputName} />
      </label>
      <label className="label-wrapper">
        Description
        <textarea
          rows={5}
          cols={30}
          value={taskDesk}
          onChange={inputDescription}
        />
      </label>
      <label className="label-wrapper">
        Deadline
        <input type="date" onChange={inputDate} />
      </label>
      <div className="modal-control">
        <input
          type="button"
          value="add"
          onClick={makeTask}
          onBlur={remowErrorStyle}
        />
      </div>
    </div>
  );
};

export default FormAdd;
