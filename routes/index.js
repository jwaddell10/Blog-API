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

function authToken(req, res, next) {
	const token = req.body.JWTToken;

	jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			return res
				.status(401)
				.json({ error: "Unauthorized - Invalid token" });
		} else {
			res.json({
				message: "Post Created",
				authData,
			});
		}
		next();
	});
}

router.get("/", function (req, res, next) {
	res.json({ key: "value" });
});

// router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);

// router.get("/logout", authController.logout);

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);

router.get("/post", postController.postGet);
router.post("/post", authToken, postController.postPost);

router.get("/users", userController.userGetAll);
router.get("/users/:userId", userController.userGetOne);

router.get("/comments", commentController.commentGetAll);
router.get("/comments/:commentId", commentController.commentGetOne);
router.post("/comments", commentController.commentPost);
router.delete("/comments/:commentId", commentController.commentDelete);

module.exports = router;
