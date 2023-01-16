import { Router } from "express";
import TaskController from "../controllers/TaskController.js";

const TaskRoute = Router();

TaskRoute.get("/board/:boardId", TaskController.getAll);

TaskRoute.post("/create", TaskController.create);
TaskRoute.post("/changeStatus/:taskId", TaskController.changeStatus);

TaskRoute.delete("/delete/:taskId", TaskController.remove);

export default TaskRoute;
