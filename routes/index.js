const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController")
const userController = require("../controllers/userController")
const commentController = require("../controllers/commentController")

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
	res.json({ key: "value" });
});

// router.get("/login", authController.loginGet);
// router.post("/login", authController.loginPost);

// router.get("/logout", authController.logout);

// router.get("/signup", authController.signupGet);
// router.post("/signup", authController.signupPost);

router.get("/post", postController.postGet);
router.post("/post", postController.postPost);

router.get('/users', userController.userGetAll);
router.get('/users/:userId', userController.userGetOne);

router.get('/comments', commentController.commentGetAll);
router.get("/comments/:commentId", commentController.commentGetOne);
router.post("/comments", commentController.commentPost);
router.delete("/comments/:commentId", commentController.commentDelete);



module.exports = router;
