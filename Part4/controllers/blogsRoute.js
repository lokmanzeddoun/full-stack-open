const blogsRouter = require("express").Router();
const Blog = require("../models/blogModel");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
	if (!request.body.title || !request.body.url) {
		return response.status(400).end();
	}
	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes ? request.body.likes : 0,
	});

	const result = await blog.save();

	response.status(201).json(result);
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (!blog) {
		response.status(404).json({ msg: "No Blog Founded" });
	}
	response.status(200).json(blog);
});
blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});
blogsRouter.put("/:id", async (request, response) => {
	const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);

	response.status(200).json({ blog });
});
module.exports = blogsRouter;
