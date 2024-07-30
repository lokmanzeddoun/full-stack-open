const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");
/* GET todos listing. */
router.get("/", async (_, res) => {
	const todos = await Todo.find({});
	res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
	const todo = await Todo.create({
		text: req.body.text,
		done: false,
	});
	const count = parseInt((await getAsync("added_todos")) || "0");
	setAsync("added_todos", count+1);
	res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
	const { id } = req.params;
	req.todo = await Todo.findById(id);
	if (!req.todo) return res.sendStatus(404);

	next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
	await req.todo.delete();
	res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
	res.status(200).json(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
	req.todo.set(req.body);
	await req.todo.save();
	res.status(200).json(req.todo); // Implement this
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
