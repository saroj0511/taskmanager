import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";
import basicAuth from "express-basic-auth";

const app = express();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Saroj@0511",
  database: "task_manager",
});

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  basicAuth({
    users: {
      admin: "adminpwd",
    },
  })
);

app.get("/", (req, res) => {
  res.send("Server is up");
});

app.get("/tasks", (req, res) => {
  const getTask = "SELECT * from task order by task asc;";
  db.query(getTask, (error, result) => {
    res.send(result);
  });
});

app.delete("/task/remove/:id", (req, res) => {
  const { id } = req.params;
  const deleteTask = "DELETE FROM task WHERE id=?";
  db.query(deleteTask, id, (error, result) => {
    if (error) {
      console.log("error- ", error);
    }
  });
});

app.post("/task/add", (req, res) => {
  let { task, group, deadline } = req.body;
  const addTask =
    "INSERT INTO task (task, group_name, deadline) VALUES (?,?,?);";
  db.query(
    addTask,
    [task, group || null, deadline || null],
    (error, result) => {
      if (error) {
        console.log("error- ", error);
      }
    }
  );
});

app.put("/task/update/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  console.log("inside put");
  const updateTask = "UPDATE TASK set done=? WHERE id=?;";
  db.query(updateTask, [done, id], (error, result) => {
    if (error) {
      console.log("error- ", error);
    }
  });
});

app.listen(8000, () => {
  console.log("The application is listening on port 8000!");
});
