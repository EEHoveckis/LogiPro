const router = require('express').Router();
const { existsSync } = require("fs");
const auth = require("../../helperFuncs/authentification/auth.js");
const userLog = require("../../helperFuncs/logging/userLog.js");
const serverLog = require("../../helperFuncs/logging/serverLog.js");


router.get("/", (req, res) => {
	const options = {
		userLog: `Requested Logs For User ${req.query.username}`,
		serverLog: `${req.headers.username} Requested Logs For User ${req.query.username}`,
		required: ["username", "temptoken", "queryUsername"],
		permissions: "getUserLogs"
	};

	const authReturn = auth(req, options);
	if (authReturn == 200) {
		if (!existsSync(`${process.cwd()}/data/logs/${req.query.username}.json`)) return res.status(404).send("404 - User Does Not Exist");
		const userLogs = require(`${process.cwd()}/data/logs/${req.query.username}.json`);
		userLog(options);
		serverLog(options);
		return res.status(200).json(userLogs);
	} else {
		res.status(authReturn[0].send(authReturn[1]));
	}
});

module.exports = router;
