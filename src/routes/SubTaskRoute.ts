import { Router } from "express";
import SubTaskController from "../controllers/SubTaskController.js";

const SubTaskRoute = Router();

SubTaskRoute.get("/task/:taskId", SubTaskController.getAll);

SubTaskRoute.post("/create", SubTaskController.create);
SubTaskRoute.post("/switchStatus/:subTaskId", SubTaskController.switchStatus);

SubTaskRoute.delete("/delete/:subTaskId", SubTaskController.remove);

export default SubTaskRoute;
