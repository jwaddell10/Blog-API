const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

// router.get("/login", authController.loginGet);
// router.post("/login", authController.loginPost);

// router.get("/logout", authController.logout);

// router.get("/signup", authController.signupGet);
// router.post("/signup", authController.signupPost);

exports.loginGet = asyncHandler(async (req, res, next) => {
	res.send("not implemented, loginget");
});

exports.loginPost = [
	//check username and password fields
	//check if user exists
	body("name", "Must enter a username").trim().isLength({ min: 5 }).escape(),
	body("password", "Must enter a password")
		.trim()
		.isLength({ min: 5 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		//check if user exists
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				res.json({
					name: req.body.name,
					errorMessage: errors.array(),
				});
				return;
			}

			const user = await User.find({
				name: req.body.name,
				password: req.body.password,
			});

			if (user.length !== 0) {
				jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
					if (err) {
						console.log(err, "this is err");
					}
					res.json({
						token,
					});
				});
			}

			if (user.length === 0) {
				res.json({ message: 'No user' })
			}
		} catch (error) {
			next(error);
		}
	}),
];

exports.signupGet = asyncHandler(async (req, res, next) => {
	res.send("not implemented, signupGet");
});

exports.signupPost = [
	body("name", "You must enter a username")
		.trim()
		.notEmpty()
		.custom(async (name) => {
			const existingUser = await User.findOne({ name: name });
			if (existingUser !== null) {
				throw new Error("User already exists");
			}
		})
		.escape(),
	body("password", "You must enter a password")
		.trim()
		.isLength({ min: 5 })
		.escape(),
	body("passwordConfirmation", "You must enter a password")
		.custom((confirmPasswordField, { req }) => {
			const currentPasswordField = req.body.password;
			if (confirmPasswordField !== currentPasswordField) {
				throw new Error("Passwords do not match");
			}
			return true;
		})
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const name = req.body.name;
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const user = new User({
				name: name,
				password: hashedPassword,
			});

			await user.save();
		} catch (error) {
			next(error);
		}
	}),
];
