const express = require("express");
const router = express.Router();
const { getAsync } = require("../redis");

const configs = require("../util/config");

let visits = 0;
/* GET index data. */
router.get("/", async (req, res) => {
	visits++;

	res.send({
		...configs,
		visits,
	});
});
router.get("/statistic", async (req, res) => {
	const count = parseInt((await getAsync("added_todos")) || "0");
	res.json({ added_todos: count });
});

module.exports = router;
