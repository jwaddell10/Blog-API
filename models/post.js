const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const postSchema = new Schema({ 
    title: {
        type: String,
        required: [true, "Post must have a title"]
    },
    date: {
        type: Date,
        default: Date.now,
    },
    text: {
        type: String,
        required: [true, "Post must have text"]
    },
    user: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    },
    visibility: {
        type: String,
        enum: ["Published", "Not Published"],
        default: "Not Published",
        required: true
    }
})

postSchema.virtual("date_formatted").get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Post", postSchema);