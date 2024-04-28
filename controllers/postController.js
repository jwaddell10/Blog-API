const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.postGet = asyncHandler(async (req, res, next) => {
	//get all posts, render them to page, res.send
	const allPosts = await Post.find({}).exec();
	console.log(allPosts, "this is all Posts");
	res.send(allPosts);
});

exports.postPost = [
	body("title").trim().isLength({ min: 1 }).escape(),
	body("text").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
            console.log(req.user, 'this is requser')
            const formattedDate = new Date().toISOString();
            const user = await User.findById(req.user)
        } catch (error) {
			console.log(error);
		}
	}),
];
