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

// function authToken(req, res, next) {
// 	// const token = req.body.JWTToken;
//   const token = req.token

// 	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
// 		if (err) {
// 			return res
// 				.status(401)
// 				.json({ error: "Unauthorized - Invalid token" });
// 		} else {
// 			res.json({
// 				message: "success",
// 				authData,
// 			});
// 		}
// 		next();
// 	});
// }

//verify token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
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

router.put("/post/:postId", verifyToken, postController.postUpdate);

router.get("/users", userController.userGetAll);
router.get("/users/:userId", userController.userGetOne);

router.get("/comments", commentController.commentGetAll);
router.get("/comments/:commentId", commentController.commentGetOne);
router.post("/comments", commentController.commentPost);
router.delete("/comments/:commentId", commentController.commentDelete);

module.exports = router;