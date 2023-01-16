import { Router } from "express";
import BoardRoute from "./BoardRoute.js";
import TaskRoute from "./TaskRoute.js";
import UserRoute from "./UserRoute.js";

const routes = Router();

routes.use("/users", UserRoute);
routes.use("/boards", BoardRoute);
routes.use("/tasks", TaskRoute);

export default routes;
