import { Router } from "express";
import BoardController from "../controllers/BoardController.js";

const BoardRoute = Router();

BoardRoute.post("/create", BoardController.create);

BoardRoute.delete("/delete/:boardId", BoardController.remove);

export default BoardRoute;
