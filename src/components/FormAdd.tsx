import React, { FormEvent, useState, useCallback, useRef } from "react";
import { ITaskProps } from "./Task";
import { useDispatch } from "react-redux";

interface IFormProps {
  dataSize: number;
}

const FormAdd = (props: IFormProps) => {
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
    },
    [taskDeadline]
  );

  // const remowErrorStyle = useCallback(
  //   (ev: FormEvent<HTMLInputElement>) => {
  //     const modalContainer = formRef.current;
  //     if (modalContainer) {
  //       modalContainer.classList.remove("fail");
  //     }

  //   },
  //   [taskDeadline]
  // );

  const makeTask = useCallback(() => {
    const modalContainer = formRef.current;
    if (modalContainer && (!taskName || !taskDesk || !taskDeadline)) {
      modalContainer.classList.add("fail");
    }

    if (taskName && taskDesk && taskDeadline) {
      const newTask: ITaskProps = {
        id: props.dataSize,
        name: taskName,
        description: taskDesk,
        deadline: taskDeadline,
        isDone: false,
      };
      dispatchAddTask({ type: "ADD_TASK", payload: newTask });
      setName("");
      setDesk("");
      setDeadline("");
    }
  }, [taskName, taskDesk, taskDeadline]);

  return (
    <div className="modal-container" ref={formRef}>
      <span>Input values</span>
      <form action="">
      <label className="label-wrapper">
        Name
        <input type="text" value={taskName} onChange={inputName} required />
      </label>
      <label className="label-wrapper">
        Description
        <textarea
        required
          rows={5}
          cols={30}
          value={taskDesk}
          onChange={inputDescription}
        />
      </label>
      <label className="label-wrapper">
        Deadline
        <input type="date" value={taskDeadline} onChange={inputDate} required/>
      </label>
      <div className="modal-control">
        <input
          type="submit"
          value="add"
          onClick={makeTask}
        />
      </div>
      
      
      </form>
    </div>
  );
};

export default FormAdd;
