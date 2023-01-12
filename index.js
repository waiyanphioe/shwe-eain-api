require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log("OK");
		});
	})
	.catch(() => {
		console.log("No");
	});
