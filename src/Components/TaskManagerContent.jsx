import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskManagerContent = (props) => {
  const basicAuth = "Basic " + btoa("admin:adminpwd");
  const done = "Y";

  const markAsDone = (id) => {
    axios
      .put(
        `http://localhost:8000/task/update/${id}`,
        { done },
        { headers: { authorization: basicAuth } }
      )
      .catch((error) => {
        console.log(`issue with marking as done operation - ${error}`);
        toast.error("There is an error! Please try again!");
      });
    console.log("marked as done");
    setTimeout(props.onReload, 500);
    toast.success("Well done on finishing your task!", { icon: "👏" });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/task/remove/${id}`, {
        headers: { authorization: basicAuth },
      })
      .catch((error) => {
        console.log(`issue with delete operation - ${error}`);
        toast.error("There is an error! Please try again!");
      });
    console.log(`Deleted task id - ${id}`);
    setTimeout(props.onReload, 500);
    toast.success("Task removed!", { icon: "🗑️" });
  };

  return (
    <div>
      <div className="TaskManagerContent">
        <div className="actionPanel">
          <div className="button-container">
            <button onClick={() => props.onTaskFilter("N")}>
              Show pending Tasks
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => props.onTaskFilter("Y")}>
              Show completed Tasks
            </button>
          </div>
          <div className="selectContainer">
            <span>Filter by groups: </span>
            <select
              name="groups"
              id="groups"
              onChange={(e) => props.onGroupFilter(e.target.value)}
            >
              <option key="All" value="All">
                All
              </option>
              {props.groups.map((groupname) => {
                return (
                  <option key={groupname} value={groupname}>
                    {groupname ? groupname : "Unnamed"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <table className="TaskManagerContent-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Task</th>
              <th>Status</th>
              <th>Group</th>
              <th>Deadline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td>
                    <button
                      disabled={item.done === "Y"}
                      onClick={() => markAsDone(item.id)}
                    >
                      {item.done === "Y" ? "Done" : "Mark as Done"}
                    </button>
                  </td>
                  <td>{item.group_name}</td>
                  <td>
                    {item.deadline &&
                      new Date(item.deadline).toLocaleDateString()}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManagerContent;
