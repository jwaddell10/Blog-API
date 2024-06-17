const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.commentGetAll = asyncHandler(async (req, res, next) => {
	try {
		const allComments = await Comment.find({})
			.populate("user")
			.populate("post")
			.exec();
		res.json(allComments);
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
		const token = req.headers["authorization"];
		// console.log(jwt.verify(token, process.env.JWT_SECRET), 'this is jwtverify')
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			const user = await User.findById(decoded.user._id)
			const formDataObject = req.body.formDataObject
			const date = new Date();
			// console.log(req.body, 'this is reqbody')
			const dateOptions = {
				year: "numeric",
				month: "long",
				day: "numeric",
			};

			const createdComment = new Comment({
				user: user,
				date: date,
				text: formDataObject.text
			})
			// console.log(createdComment, 'thisis createdcomment')

			await createdComment.save()
		} catch(err) {
			console.log(error, 'this is error')
		}
		//find the user, create comment and save comment
		// const user = await User.findById
	}),
];

exports.commentDelete = asyncHandler(async (req, res, next) => {
	res.json("comment delete is working");
});
