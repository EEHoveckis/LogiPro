const getUser = require("../mongo/getUser.js");

function verifyPermissions(permsNeeded) {
	return async (req, res, next) => {
		const userData = await getUser(req.headers.username);
		if (!userData.permissions.includes(permsNeeded) && !userData.permissions.includes("ADMIN")) return res.status(403).json({ errorCode: "missingPerms" });
		next();
	}
};

module.exports = verifyPermissions;
