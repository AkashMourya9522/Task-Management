import express from "express";

import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controller/task.controller.js";
import verifyUser from "../miscellaneous/verifyUserMiddleware.js";
const route = express.Router();

route.post("/create",verifyUser ,createTask);
route.delete("/delete/:id",verifyUser,deleteTask)
route.put("/update/:id",verifyUser,updateTask)
route.get("/getTasks",verifyUser,getTasks)
route.get("/getTask/:id",verifyUser,getTask)


export default route;
