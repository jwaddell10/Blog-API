const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	text: {
		type: String,
		required: [true, "Comment must have text"],
	},
});

commentSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", commentSchema);
