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
		try {
			const token = req.body.JWTToken;
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const userId = decoded.user._id;

			const formattedDate = new Date().toISOString();
			const user = await User.findById(userId);
			const postTitle = req.body.formDataObject.title;
			const postText = req.body.formDataObject.text;

			const createdPost = new Post({
				title: postTitle,
				date: formattedDate,
				text: postText,
				user: user,
			});

			await createdPost.save();
		} catch (error) {
			console.log(error);
		}
	}),
];
