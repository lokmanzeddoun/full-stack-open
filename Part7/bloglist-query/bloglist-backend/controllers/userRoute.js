const userRouter = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs", {
		url: 1,
		title: 1,
		author: 1,
		id: 1,
	});
	response.status(200).json(users);
});
userRouter.post("/", async (req, res) => {
	const { username, name, password } = req.body;
	if (password === undefined || username === undefined) {
		return res
			.status(400)
			.json({ error: "password and username must be given" });
	} else if (password.length < 3 || username.length < 3) {
		return res
			.status(400)
			.json({
				error: "password or username must be at least 3 characters long",
			});
	} else {
		const saltRound = 10;
		const passwordHash = await bcrypt.hash(password, saltRound);
		const user = new User({
			username,
			name,
			passwordHash,
		});
		const savedUser = await user.save();

		res.status(201).json(savedUser);
	}
});

module.exports = userRouter;
