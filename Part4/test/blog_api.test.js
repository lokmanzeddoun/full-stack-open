const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blogModel");
const { log } = require("console");
const api = supertest(app);
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash("admin", 10);
	const user = new User({
		username: "admin",
		name: "admin",
		blogs: [],
		passwordHash,
	});

	await user.save();
});
beforeEach(async () => {
	await Blog.deleteMany({});
	const users = await User.find({});
	const user = users[0];
	await Promise.all(
		blogs
			.map(
				(blog) =>
					new Blog({
						title: blog.title,
						author: blog.author,
						url: blog.url,
						user: user._id,
						likes: blog.likes ? blog.likes : 0,
					})
			)
			.map(async (item) => {
				await item.save();
				user.blogs = user.blogs.concat(item._id);
			})
	);
	await user.save();
});

describe("when there is initially some blogs saved", () => {
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

describe.only("addition of new blog", () => {
	test.only("verify the create blog ", async () => {
		const user = new User({
			username: "admin",
			password: "admin",
		});
		const loginUser = await api.post("/api/login").send(user);
		const newBlog = {
			title: "Data Structures Cheat Sheet",
			author: "Matea Pesic",
			url: "https://memgraph.com/blog/data-structures-cheat-sheet",
			likes: 10,
		};
		console.log("🚀 ~ test ~ loginUser.body.token:", loginUser.body.token);
		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("Authorization", `Bearer ${loginUser.body.token}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length + 1);
	});
	test("test create blog without likes", async () => {
		const user = new User({
			username: "admin",
			password: "admin",
		});
		const loginUser = await api.post("/api/login").send(user);
		const newBlog = {
			title: "Data Structures Cheat Sheet",
			author: "Matea Pesic",
			url: "https://memgraph.com/blog/data-structures-cheat-sheet",
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("Authorization", `Bearer ${loginUser.body.token}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length + 1);

		const likes = response.body.map((blog) => blog.likes);
		assert(likes.includes(0));
	});
	test("a blog cannot be added by unauthorized users", async () => {
		const newBlog = {
			title: "Data Structures Cheat Sheet",
			author: "Matea Pesic",
			url: "https://memgraph.com/blog/data-structures-cheat-sheet",
			likes: 100,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(401)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, blogs.length);

		const titles = response.body.map((n) => n.title);
		assert(titles.includes(newBlog.title));
	});
	test("test create blog without title", async () => {
		const user = new User({
			username: "admin",
			password: "admin",
		});
		const loginUser = await api.post("/api/login").send(user);
		const newBlog = {
			author: "Matea Pesic",
			url: "https://memgraph.com/blog/data-structures-cheat-sheet",
			likes: 5,
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("Authorization", `Bearer ${loginUser.body.token}`)
			.expect(400);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length);
	});
	test("test create blog without title", async () => {
		const user = new User({
			username: "admin",
			password: "admin",
		});
		const loginUser = await api.post("/api/login").send(user);
		const newBlog = {
			title: "Data Structures Cheat Sheet",
			author: "Matea Pesic",
			likes: 5,
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("Authorization", `Bearer ${loginUser.body.token}`)
			.expect(400);
		const response = await api.get("/api/blogs");
		assert.strictEqual(response.body.length, blogs.length);
	});
});

describe("deletion of blog", () => {
	test("delete a blog", async () => {
		const user = new User({
			username: "admin",
			password: "admin",
		});
		const loginUser = await api.post("/api/login").send(user);
		const response = await api.get("/api/blogs");
		const blogToDelete = response.body[0];
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set("Authorization", `Bearer ${loginUser.body.token}`)
			.expect(204);
		const response2 = await api.get("/api/blogs");
		assert.strictEqual(response2.body.length, blogs.length - 1);
	});
});
describe("update a blog", () => {
	test.only("update the info of blog", async () => {
		const user = new User({
			username: "admin",
			password: "admin",
		});
		const loginUser = await api.post("/api/login").send(user);
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
			.set("Authorization", `Bearer ${loginUser.body.token}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);
		const response2 = await api.get("/api/blogs");

		assert.strictEqual(response2.body.length, blogs.length);
		// check the likes if changed
		const likes = response2.body.map((blog) => blog.likes);
		assert(likes.includes(newBlog.likes));
	});
});
describe.only("when there is initially one user in db", () => {
	test.only("creation  with a fresh username", async () => {
		const usersAtStart = await api.get("/api/users");

		const newUser = {
			username: "lokmane",
			name: "lukazed",
			password: "admin123",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await api.get("/api/users");
		assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length + 1);

		const usernames = usersAtEnd.body.map((u) => u.username);
		assert(usernames.includes(newUser.username));
	});

	test.only("creation fails with proper statuscode and message if username does not exist", async () => {
		const usersAtStart = await api.get("/api/users");

		const newUser = {
			name: "zeddoun",
			password: "user123",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert(result.body.error.includes("password and username must be given"));

		const usersAtEnd = await api.get("/api/users");
		assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length);
	});

	test.only("creation fails with proper statuscode and message if password does not exist", async () => {
		const usersAtStart = await api.get("/api/users");

		const newUser = {
			name: "zeddoun",
			username: "lukazed",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert(result.body.error.includes("password and username must be given"));

		const usersAtEnd = await api.get("/api/users");
		assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length);
	});

	test.only("creation fails with proper statuscode and message if username already taken", async () => {
		const usersAtStart = await api.get("/api/users");

		const newUser = {
			username: "admin",
			name: "super",
			password: "admin123456",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert(result.body.error.includes("expected `username` to be unique"));

		const usersAtEnd = await api.get("/api/users");
		assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length);
	});

	test.only("creation fails with proper statuscode and message if username is less than 3 characters", async () => {
		const usersAtStart = await api.get("/api/users");

		const newUser = {
			username: "lu",
			name: "zeddoun",
			password: "user123",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert(
			result.body.error.includes(
				"password or username must be at least 3 characters long"
			)
		);

		const usersAtEnd = await api.get("/api/users");
		assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length);
	});

	test.only("creation fails with proper statuscode and message if password is less than three characters", async () => {
		const usersAtStart = await api.get("/api/users");

		const newUser = {
			username: "lokmane",
			name: "zeddoun",
			password: "ad",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		assert(
			result.body.error.includes(
				"password or username must be at least 3 characters long"
			)
		);

		const usersAtEnd = await api.get("/api/users");
		assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length);
	});
});
after(async () => {
	await mongoose.connection.close();
});
