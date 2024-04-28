const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.userGetAll = asyncHandler(async (req, res, next) => {
    res.send("userGetAll is working")
})

exports.userGetOne = asyncHandler(async (req, res, next) => {
    res.send("userGetOne is working")
})