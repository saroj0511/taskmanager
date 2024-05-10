import React, { useEffect, useState } from "react";
import TaskManagerContent from "./TaskManagerContent";
import TaskManagerHeader from "./TaskManagerHeader";
import TaskManagerInput from "./TaskManagerInput";
import axios from "axios";

const TaskManager = () => {
  const basicAuth = "Basic " + btoa("admin:adminpwd");
  // data contains the last loaded data from server at any point of time
  const [data, setData] = useState([]);
  const groups = [...new Set(data.map((item) => item.group_name))];
  //filteredData contains the transformed data displayed to the user
  const [filteredData, setFilteredData] = useState([]);

  const filterGroup = (group_value) => {
    if (group_value === "All") {
      setFilteredData(data);
    } else {
      const currentGroup = group_value === "Unnamed" ? null : group_value;
      setFilteredData(data.filter((item) => item.group_name === currentGroup));
    }
  };

  const loadTasks = async () => {
    const response = await axios.get("http://localhost:8000/tasks", {
      headers: { authorization: basicAuth },
    });
    if (response) {
      setData(response.data);
      setFilteredData(response.data);
    }
  };

  const filterTask = (done) => {
    setFilteredData(data.filter((item) => item.done === done));
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="TaskManager">
      <TaskManagerHeader />
      <TaskManagerInput onReload={loadTasks} />
      <TaskManagerContent
        data={filteredData}
        groups={groups}
        onReload={loadTasks}
        onTaskFilter={filterTask}
        onGroupFilter={filterGroup}
      />
    </div>
  );
};

export default TaskManager;
