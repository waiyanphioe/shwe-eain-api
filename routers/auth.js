const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "email and password" });
	}

	const userData = await User.findOne({ email });
	if (!userData) {
		return res.status(400).json({ message: "email or password is wrong" });
	}

	const match = await bcrypt.compare(password, userData.password);
	if (match) {
		const token = jwt.sign({ id: userData._id }, process.env.JWT_SEC, {
			expiresIn: "7d",
		});
		return res.status(200).json({ token, userData });
	}

	return res.status(400).json({ message: "email or password is wrong" });
});

router.post("/signup", async (req, res) => {
	const { name, username, email, password } = req.body;

	if (!name || !username || !email || !password) {
		return res.status(400).json({
			message: "name, username , email and password fields are required",
		});
	}

	const userExit = await User.findOne({ username });
	if (userExit) {
		return res.status(400).json({ message: "Username is already taken" });
	}

	const hash = await bcrypt.hash(password, 10);
	const newUser = new User({ name, username, email, password: hash });
	try {
		const userData = await newUser.save();
		const token = jwt.sign({ id: userData._id }, process.env.JWT_SEC, {
			expiresIn: "7d",
		});

		return res.status(200).json({ token, userData });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
});

router.post("/verify", (req, res) => {});

module.exports = router;
