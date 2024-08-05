const blogsRouter = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Comment = require('../models/commentModel')
blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate('comment').populate("user", {
		username: 1,
		id: 1,
		name: 1,
	});
	response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
	const user = request.user;
  const comment = await Comment.findById(body.commentId)
	if (!user) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	if (!request.body.title || !request.body.url) {
		return response.status(400).end();
	}
	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes ? request.body.likes : 0,
		user: user.id,
		comment:comment.id
	});

	const result = await blog.save();
	user.blogs = user.blogs.concat(result._id);
	await user.save();
	comment.blogs = comment.blogs.concat(savedBlog._id);
    await comment.save();

	response.status(201).json(result);
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate("comment");
	if (!blog) {
		response.status(404).json({ msg: "No Blog Founded" });
	}
	response.status(200).json(blog);
});
blogsRouter.delete("/:id", async (request, response) => {
	const user = request.user;

	if (!user) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const blog = await Blog.findById(request.params.id);
	if (blog.user.toString() === request.user.id) {
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	} else {
		return response
			.status(401)
			.json({ error: "Unauthorized to delete the blog" });
	}
});
blogsRouter.put("/:id", async (request, response) => {
	const res = await Blog.findByIdAndUpdate(request.params.id, request.body, {
		new: true,
	});

	response.status(200).json(res);
});
module.exports = blogsRouter;
