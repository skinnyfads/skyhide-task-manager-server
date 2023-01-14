import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserRoute = Router();

UserRoute.post("/create", UserController.create);
UserRoute.post("/login", UserController.login);

UserRoute.delete("/delete/:username", UserController.remove);

export default UserRoute;
