const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
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
        res.json(allComments)
	} catch (err) {
		res.json(err);
	}
	res.json("commentGetAll is working");
});

exports.commentGetOne = asyncHandler(async (req, res, next) => {
	res.json("commentGetONe is working");
});

exports.commentPost = asyncHandler(async (req, res, next) => {
	res.json("comment post is working");
});

exports.commentDelete = asyncHandler(async (req, res, next) => {
	res.json("comment delete is working");
});
