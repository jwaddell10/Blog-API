const mongoose = require("mongoose");
const Comment = require("./models/comment");
const User = require("./models/user");
console.log(User, 'this is user')
const Post = require("./models/post");
require("dotenv").config();

const comments = [];
const posts = [];
const users = [];

main().catch((err) => console.log(err));

async function main() {
	const mongoDB = process.env.MONGODB_URI;
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "mongo connection error"));

	await mongoose.connect(mongoDB);
	console.log("Should be connected");

	// await Promise.all([Post.deleteMany(), User.deleteMany()]);
    await createUsers();
    console.log('user created')
	await createPosts();
    console.log('posts created')
}

async function postCreate(index, title, date, text, user, visibility) {
	const newPost = {
		title: title,
		date: date,
		text: text,
		user: user,
		visibility: visibility,
	};

	const post = new Post(newPost);

	await post.save();
	posts[index] = post;
	console.log(posts[0], "this is posts array");
}

async function userCreate(index, name, password, role) {
	const newUser = {
		name: name,
		password: password,
		role: role,
	};

	const user = new User(newUser);

	await user.save();
	users[index] = user;
	console.log(users[0], "this is users array");
}

async function createPosts() {
	await Promise.all([
		postCreate(
			0,
			"Post Title",
			new Date("2024-04-05"),
			"Post from jonathan, hello!",
			users[0],
			"Published"
		),
		postCreate(
			1,
			"Another Post Title",
			new Date("2024-04-06"),
			"another Post from jonathan, hello world",
			users[1],
			"Not Published"
		),
	]);
}

async function createUsers() {
	await Promise.all([
		userCreate(0, "Anon", "1234password", "Admin"),
		userCreate(1, "Anon", "anotherpassword", "User"),
	]);
}
