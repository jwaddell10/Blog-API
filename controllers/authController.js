const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment"); //may not need this
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

// router.get("/login", authController.loginGet);
// router.post("/login", authController.loginPost);

// router.get("/logout", authController.logout);

// router.get("/signup", authController.signupGet);
// router.post("/signup", authController.signupPost);
// const checkForDuplicateUserName = asyncHandler(async (req, res, next) => {
// 	console.log(req.body, "this is reqbody");
// 	const name = req.body.formDataObject.name;
  
// 	try {
// 	  const duplicate = await User.findOne({ name: name });
// 	  console.log(duplicate, "this is duplicate");
  
// 	  if (duplicate !== null) {
// 		return res.status(404).json({ message: "User already exists" });
// 	  }
  
// 	  // If no duplicate user is found, call next() to continue the request flow
// 	  next();
// 	} catch (error) {
// 	  // If an error occurs, pass it to the next error handling middleware
// 	  next(error);
// 	}
//   });
// const checkForDuplicatePassword = asyncHandler(async (req, res, next) => {
// 	const password = req.body.formDataObject.password
// 	const passwordConfirmation = req.body.formDataObject.passwordConfirmation

// 	if (password !== passwordConfirmation) {
// 		throw new Error('Passwords do not match');
// 	} else {
// 		console.log('they match');
// 		return true;
// 	}
// })

exports.signupGet = asyncHandler(async (req, res, next) => {
	res.send("not implemented, signupGet");
});

exports.signupPost = [
	//doesn't check password properly***

	// console.log(req.body.formDataObject, "this is reqbody");
	// //take request body, let usersign in, sanitize password?
	// checkForDuplicateUserName(),
	// checkForDuplicatePassword(),

	body("name", "You must enter a username")
		.trim()
		.notEmpty()
		.isAlphanumeric()
		.custom(async (req) => {
			const name = req.body.name;
			const existingUser = await User.findOne(name);
			console.log(existingUser, "this is existinguser");
			if (existingUser) {
				throw new Error("User already exists");
			}
		})
		.withMessage("Username can only contain letters and numbers")
		.escape(),
	body("password", "You must enter a password").trim().notEmpty().escape(),
	body("passwordConfirmation", "You must enter a password")
		.custom((value, {req}) => {
			console.log(value, 'this is value password field')
			return value = req.body.formDataObject.password
		})
		.escape(),

	// asyncHandler(async (req, res, next) => {
	// 	const errors = validationResult(req);

	// 	const name = req.body.formDataObject.name;
	// 	try {
	// 		bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
	// 			if (err) {
	// 				throw new Error("User could not be created");
	// 			}
	// 			const user = new User({
	// 				name: name,
	// 				password: hashedPassword,
	// 			});

	// 			await user.save();
	// 			res.redirect("/");
	// 		});
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }),
];
