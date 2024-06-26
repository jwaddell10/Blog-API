const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const post = require("../models/post");

exports.commentGetAll = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params.id
		const comment = await Comment.find({ post: id})
			.populate("post")
			.populate("user")
			.exec();

		console.log(comment, 'this is comment')
		res.json(comment);
	} catch (err) {
		res.json(err);
	}
});

exports.commentGetOne = asyncHandler(async (req, res, next) => {
	res.json("commentGetONe is working");
});

exports.commentPost = [
	body("text")
		.isLength({ min: 5 })
		.withMessage("Comment must be 5 characters")
		.escape(),

	asyncHandler(async (req, res, next) => {
		try {
			const token = req.headers["authorization"];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.user._id);
			const post = await Post.findById(req.params.id);
			const formDataObject = req.body.formDataObject;
			const date = new Date();

			const dateOptions = {
				year: "numeric",
				month: "long",
				day: "numeric",
			};

			const createdComment = new Comment({
				user: user,
				date: date,
				text: formDataObject.text,
				post: post,
			});
		
			await createdComment.save();
			res.json("Comment created")
		} catch (error) {
			console.log(error, "this is error");
		}
	}),
];

exports.commentDelete = asyncHandler(async (req, res, next) => {
	try {
		const commentToDelete = await Comment.findByIdAndDelete(
			req.params.commentId
		);

		res.json(commentToDelete)
	} catch (error) {
		res.json(error);
	}
});