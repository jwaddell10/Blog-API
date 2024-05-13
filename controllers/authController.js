const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

// router.get("/login", authController.loginGet);
// router.post("/login", authController.loginPost);

// router.get("/logout", authController.logout);

// router.get("/signup", authController.signupGet);
// router.post("/signup", authController.signupPost);

exports.signupGet = asyncHandler(async (req, res, next) => {
	res.send("not implemented, signupGet");
});

exports.signupPost = asyncHandler(async (req, res, next) => {
	console.log(req.body.formDataObject, "this is reqbody");
	//take request body, let usersign in, sanitize password?
	const name = req.body.formDataObject.name;
	console.log(name, "this is username");
	asyncHandler(async (req, res, next) => {
		try {
			const duplicate = await User.findOne({ name: name });

			if (duplicate !== null) {
				res.json({ errorMessage: "user already exists" });
			}
		} catch (error) {
			next(error);
		}
	});

	body("name", "You must enter a username").trim().isLength({ min: 1 }).exec();
});
