import express from "express";

import { createTask, deleteTask, getCompletedTasks, getTask, getTasks, updateTask } from "../controller/task.controller.js";
import verifyUser from "../miscellaneous/verifyUserMiddleware.js";
const route = express.Router();

route.post("/create",verifyUser ,createTask);
route.delete("/delete/:id",verifyUser,deleteTask)
route.put("/update/:id",verifyUser,updateTask)
route.get("/getTasks",verifyUser,getTasks)
route.get("/getTask/:id",verifyUser,getTask)
route.get("/getCompletedTasks/:id",verifyUser,getCompletedTasks)


export default route;
