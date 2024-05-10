import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskManagerInput = (props) => {
  const basicAuth = "Basic " + btoa("admin:adminpwd");
  const initialState = {
    task: "",
    group: "",
    deadline: "",
  };
  const [state, setState] = useState(initialState);
  const { task, group, deadline } = state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task) {
      axios
        .post(
          "http://localhost:8000/task/add",
          { task, group, deadline },
          { headers: { authorization: basicAuth } }
        )
        .catch((error) => {
          console.log(`issue with add operation - ${error}`);
          toast.error("There is an error! Please try again!");
        });
      setState(initialState);
      setTimeout(props.onReload, 500);
      console.log("added new task");
      toast.success("New task Added!");
    }
  };

  return (
    <form className="TaskManagerForm" onSubmit={handleSubmit}>
      <input
        type="text"
        id="task"
        name="task"
        value={task}
        placeholder="Add your task here....."
        className="TaskManagerForm-input"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        id="group"
        name="group"
        value={group}
        placeholder="Group"
        className="TaskManagerForm-input"
        onChange={handleInputChange}
      ></input>
      <input
        type="date"
        id="deadline"
        name="deadline"
        value={deadline}
        className="TaskManagerForm-input"
        onChange={handleInputChange}
      ></input>
      <button type="submit" className="TaskManagerForm-btn">
        Add
      </button>
    </form>
  );
};

export default TaskManagerInput;
