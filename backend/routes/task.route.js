import express from "express";

import { createTask } from "../controller/task.controller.js";
import verifyUser from "../miscellaneous/verifyUserMiddleware.js";
const route = express.Router();

route.post("/create",verifyUser ,createTask);


export default route;
