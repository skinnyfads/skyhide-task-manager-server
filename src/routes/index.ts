import { Router } from "express";
import BoardRoute from "./BoardRoute.js";
import SubTaskRoute from "./SubTaskRoute.js";
import TaskRoute from "./TaskRoute.js";
import UserRoute from "./UserRoute.js";

const routes = Router();

routes.use("/users", UserRoute);
routes.use("/boards", BoardRoute);
routes.use("/tasks", TaskRoute);
routes.use("/subtasks", SubTaskRoute);

export default routes;
