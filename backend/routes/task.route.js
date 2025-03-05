import express from "express";

import { createTask, deleteTask } from "../controller/task.controller.js";
import verifyUser from "../miscellaneous/verifyUserMiddleware.js";
const route = express.Router();

route.post("/create",verifyUser ,createTask);
route.delete("/delete/:id",verifyUser,deleteTask)

export default route;
