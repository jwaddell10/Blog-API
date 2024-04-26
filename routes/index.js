const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const postController = require("../controllers/postController");

//one for whole collection, one for single object

//create a blog post POST
//update a post PUT
//delete a post DELETE
//get a list of blog posts GET
//get a specific post GET
//comments on a single post
//get a single comment
/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/post", postController.postGet);
router.post("/post", postController.postPost)

module.exports = router;
