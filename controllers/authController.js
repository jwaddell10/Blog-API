const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const bcrypt = require("bcryptjs");
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

exports.signupPost = [
	//doesn't check password properly***

	// console.log(req.body.formDataObject, "this is reqbody");
	// //take request body, let usersign in, sanitize password?
	asyncHandler(async (req, res, next) => {
		console.log(req.body.formDataObject.password, "this is password");
		const name = req.body.formDataObject.name;
		try {
			const duplicate = await User.findOne({ name: name });
			if (duplicate) {
				res.status(400).json({ errorMessage: "user already exists" });
			} else {
				next();
			}
		} catch (error) {
			next(error);
		}
	}),

	body("name", "You must enter a username")
		.trim()
		.notEmpty()
		.isAlphanumeric()
		.withMessage("Username can only contain letters and numbers")
		.escape(),
	body("password", "You must enter a password")
		.trim()
		.notEmpty()
		.matches("passwordConfirmation")
		.escape(),
	body("passwordConfirmation", "You must enter a password")
		.matches("password")
		// .custom((value) => {
		// 	if (value !== req.body.formDataObject.password) {
		// 		throw new Error("Passwords do not match");
		// 	}
		// })
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const name = req.body.formDataObject.name;
		try {
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				if (err) {
					throw new Error("User could not be created");
				}
				const user = new User({
					name: name,
					password: hashedPassword,
				});

				await user.save();
				res.redirect("/");
			});
		} catch (error) {
			next(error);
		}
	}),
];
