const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		return res.status(401).json({ message: "You are not authenticated!!" });

	jwt.verify(token, process.env.JWT_SEC, (err, user) => {
		if (err) return res.status(403).json({ message: "Invalid token" });
		if (user) {
			res.user = user;
			next();
		}
	});
};

module.exports = { verifyToken };
