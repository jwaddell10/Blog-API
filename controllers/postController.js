const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.postGet = asyncHandler(async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const allPosts = await Post.find({}).populate("user").exec();

		res.json(allPosts);
	} catch (error) {
		console.log(error);
	}
});


exports.postPost = [
	body("title").trim().isLength({ min: 1 }).escape(),
	body("text").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
			if (err) {
				res.sendStatus(403)
			} else {
				res.json({
					message: "Post created",
					authData,
				});
			}
		});
		// try {
		// 	const errors = validationResult(req);
		// 	if (!errors.isEmpty()) {
		// 		return res.status(400).json({ errors: errors.array() });
		// 	}
		// 	console.log(req.body, "thisi s req body");
		// 	console.log(req, "this is requser");
		// 	const formattedDate = new Date().toISOString();
		// 	const user = await User.findById(req.user);
		// } catch (error) {
		// 	console.log(error);
		// }
	}),
];
