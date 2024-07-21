const testRouter = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

testRouter.post("/reset", async (req, res) => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	res.status(204).end();
});

module.exports = testRouter;
