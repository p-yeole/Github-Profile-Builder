import express from "express";
import { connect } from "mongoose";
import userRouter from "./src/account/users/users.routes.js";
import RepoRouter from "./src/repositories/repo.routes.js";

//initializing express app
const app = express();
const port = 4000;

//Connecting with MongoDB using Mongoose
(async () => {
	try {
		await connect("mongodb://127.0.0.1:27017/gitRepos");
		console.log("MongoDB connected!");
	} catch (err) {
		console.log("MongoDB connection error:", err);
	}
})();

//middleware
app.use(express.json());

app.use("/users", userRouter);
app.use("/repos", RepoRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
