const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "User must have a name"],
	},
	password: {
		type: String,
		required: [true, "User must have a password"],
	},
	role: {
		type: String,
		required: true,
		enum: ["Admin", "Author", "User"],
	},
});

module.exports = mongoose.model("User", userSchema);