import Express from "express";
import { getUserDataFromDB } from "./repo.controller.js";

const RepoRouter = Express.Router();
RepoRouter.get("/:userId/repos", getUserDataFromDB);

export default RepoRouter;
