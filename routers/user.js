const router = require("express").Router();
const User = require("../models/user");
const { verifyToken } = require("./verifyToken");

router.get("/me", verifyToken, async (req, res) => {
	const data = res.user;

	const userData = await User.findOne({ _id: data.id });

	if (userData) {
		return res.status(200).json(userData);
	}

	return res.status(400).json({ message: "User not found" });
});

module.exports = router;
