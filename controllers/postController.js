const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { format } = require("morgan");

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

exports.postGetOne = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params.id
		const post = await Post.findById(id).populate("user").populate("comment").exec();
		res.json(post)
	} catch(error) {
		console.log(error)
	}
})

exports.postPost = [
	body("title").trim().isLength({ min: 1 }).escape(),
	body("text").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		try {
			const token = req.body.JWTToken;
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const userId = decoded.user._id;

			const date = new Date();

			const dateOptions = {
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			const formattedDate = date.toLocaleDateString("en-US", dateOptions);
			const user = await User.findById(userId);
			const postTitle = req.body.formDataObject.title;
			const postText = req.body.formDataObject.text;

			const isPublished = req.body.isPublished;

			let visibilityValue =
				isPublished === "true" ? "Published" : "Not Published";

			const createdPost = new Post({
				title: postTitle,
				date: formattedDate,
				text: postText,
				user: user,
				visibility: visibilityValue,
			});
			console.log(createdPost, 'this post was created')

			await createdPost.save();
		} catch (error) {
			console.log(error);
		}
	}),
];

exports.postUpdate = [
	body("title").trim().isLength({ min: 1 }).escape(),
	body("text").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		try {
			const postTitle = req.body.title;
			const postText = req.body.text;
			const isPublished = req.body.isPublished;
			let visibilityValue =
				isPublished === "true" ? "Published" : "Not Published";

			const updatePost = await Post.findByIdAndUpdate(
				req.params.postId,
				{
					title: postTitle,
					text: postText,
					visibility: visibilityValue,
				},
				{ runValidators: true, new: true }
			);

			if (!updatePost) {
				return res.status(404).json({ error: "Post not found" });
			}
		} catch (error) {
			console.log(error);
		}
	}),
];

exports.postDelete = asyncHandler(async (req, res, next) => {
	try {
		const postToDelete = await Post.findByIdAndDelete(req.params.id);
		res.status(200).json(postToDelete)
	} catch(error) {
		res.json(error);
	}
})