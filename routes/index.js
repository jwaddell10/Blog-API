const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
//one for whole collection, one for single object

//create a blog post POST
//update a post PUT
//delete a post DELETE
//get a list of blog posts GET
//get a specific post GET
//comments on a single post
//get a single comment
/* GET home page. */

//verify token
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers["authorization"];
	// Check if bearer is undefined
	if (bearerHeader !== "null") {
		const bearer = bearerHeader.split(" ");
		// Get token from array
		const bearerToken = bearer[1];
		// Set the token
		req.token = bearerToken;
		next();
	} else {
		res.status(500).res.json("error");
		throw new Error("Forbidden");
	}
}

router.get("/", function (req, res, next) {
	res.json({ key: "value" });
});

router.post("/login", authController.loginPost);

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);

router.get("/post", postController.postGet);
router.post("/post", verifyToken, postController.postPost);
router.delete("/post/:id", verifyToken, postController.postDelete);

// router.put("/post/:postId", verifyToken, postController.postUpdate);
router.get("/post/:id", postController.postGetOne);

router.get("/user", userController.userGetAll);
router.get("/user/:userId", userController.userGetOne);

router.get("/:id/comment", commentController.commentGetAll);
router.get("/comment/:commentId", commentController.commentGetOne);
router.post("/:id/comment", verifyToken, commentController.commentPost);
router.delete("/comment/:commentId", verifyToken, commentController.commentDelete);

module.exports = router;
