const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blogModel");
const { log } = require("console");
const api = supertest(app);
const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

describe("when there is initially some blogs saved", () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		await Promise.all(
			blogs.map((blog) => new Blog(blog)).map((item) => item.save())
		);
	}, 10000);
	test("blogs are returned as json ", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});
	test.only("all blogs are returned", async () => {
		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, blogs.length);
	});
});
describe("viewing a specific blog", () => {
	test("verify the unique identifier", async () => {
		const blogs = await Blog.find({});
		const result = blogs.map((blog) => blog.toJSON());
		assert.notStrictEqual(result[0].id, undefined);
	});
});

describe("addition of new blog", () => {
	test("verify the create blog ", async () => {
		const newBlog = {
			title: "Data Structures Cheat Sheet",
			author: "Matea Pesic",
			url: "https://memgraph.com/blog/data-structures-cheat-sheet",
			likes: 10,
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length + 1);
	});
	test("test create blog without likes", async () => {
		const newBlog = {
			title: "Data Structures Cheat Sheet",
			author: "Matea Pesic",
			url: "https://memgraph.com/blog/data-structures-cheat-sheet",
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length + 1);

		const likes = response.body.map((blog) => blog.likes);
		assert(likes.includes(0));
	});
	test("test create blog without title", async () => {
		const newBlog = {
			author: "Matea Pesic",
			url: "https://memgraph.com/blog/data-structures-cheat-sheet",
			likes: 5,
		};
		await api.post("/api/blogs").send(newBlog).expect(400);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length);
	});
	test("test create blog without title", async () => {
		const newBlog = {
			title: "Data Structures Cheat Sheet",
			author: "Matea Pesic",
			likes: 5,
		};
		await api.post("/api/blogs").send(newBlog).expect(400);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length);
	});
});

describe("deletion of blog", () => {
	test("delete a blog", async () => {
		const response = await api.get("/api/blogs");
		const blogToDelete = response.body[0];
		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
		const response2 = await api.get("/api/blogs");
		assert.strictEqual(response2.body.length, blogs.length - 1);
	});
});
describe("update a blog", () => {
	test("update the info of blog", async () => {
		const response = await api.get("/api/blogs");
		const blogToUpdate = response.body[0];

		const newBlog = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: 100,
		};
		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.expect(200)
			.expect("Content-Type", /application\/json/);
		const response2 = await api.get("/api/blogs");

		assert.strictEqual(response2.body.length, blogs.length);
		// check the likes if changed
		const likes = response2.body.map((blog) => blog.likes);
		assert(likes.includes(newBlog.likes))
	});
});
after(async () => {
	await mongoose.connection.close();
});
