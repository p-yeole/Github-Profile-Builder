import Express from "express";
import { getUserDataFromDB } from "./users.controller.js";

const userRouter = Express.Router();
userRouter.get("/:userId", getUserDataFromDB);

export default userRouter;
