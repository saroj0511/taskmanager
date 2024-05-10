"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const app = (0, express_1.default)();
const db = mysql2_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "Saroj@0511",
    database: "task_manager",
});
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_basic_auth_1.default)({
    users: {
        admin: "adminpwd",
    },
}));
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
    const addTask = "INSERT INTO task (task, group_name, deadline) VALUES (?,?,?);";
    db.query(addTask, [task, group || null, deadline || null], (error, result) => {
        if (error) {
            console.log("error- ", error);
        }
    });
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
