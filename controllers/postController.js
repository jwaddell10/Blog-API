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
    res.send(allPosts)
});

exports.postPost = asyncHandler(async (req, res, next) => {
    console.log(req, 'this is req')
})