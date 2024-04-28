const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.commentGetAll = asyncHandler(async (req, res, next) => {
    res.send("commentGetAll is working")
})

exports.commentGetOne = asyncHandler(async (req, res, next) => {
    res.send("commentGetONe is working")
})

exports.commentPost = asyncHandler(async (req, res, next) => {
    res.send("comment post is working")
})

exports.commentDelete = asyncHandler(async (req, res, next) => {
    res.send("comment delete is working")
})