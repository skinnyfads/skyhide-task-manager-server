import { Router } from "express";
import BoardRoute from "./BoardRoute.js";
import UserRoute from "./UserRoute.js";

const routes = Router();

routes.use("/users", UserRoute);
routes.use("/boards", BoardRoute);

export default routes;
