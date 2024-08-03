const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const blogsRouter = require("./controllers/blogsRoute");
const loginRouter = require("./controllers/loginRoute");
const userRouter = require("./controllers/userRoute");
const testingRouter = require("./controllers/testRoute");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const config = require("./utils/config");
mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message);
	});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/testing", testingRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
