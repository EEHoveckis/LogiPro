const { existsSync } = require("fs");
const router = require('express').Router();
const auth = require("../../helperFuncs/authentification/auth.js");
const editUser = require("../../helperFuncs/userActions/editUser.js");
const newLog = require("../../helperFuncs/logging/newLog.js");

router.put("/", (req, res) => {
	const options = {
		name: "editUser",
		username: req.headers.username,
		userLog: `Edited User - ${req.query.username}`,
		serverLog: `${req.headers.username} Edited User ${req.query.username}`,
		required: ["username", "temptoken", "queryUsername"],
		permissions: "ADMIN"
	};

	const authReturn = auth(req, options);
	if (authReturn == 200) {
		if (!existsSync(`${process.cwd()}/data/users/${req.query.username}.json`)) return res.status(500).send("500 - User Does Not Exist");
		if (req.query.newusername == undefined && req.query.newfirstname == undefined && req.query.newlastname == undefined && req.query.newpassword == undefined && req.query.newgroup == undefined) res.send("500 - No Parameters To Change Supplied");
		newLog(options);
		res.status(200).json(editUser(req));
	} else {
		res.status(authReturn[0]).send(authReturn[1]);
	}
});

module.exports = router;
