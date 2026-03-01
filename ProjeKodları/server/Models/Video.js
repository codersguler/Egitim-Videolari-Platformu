const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    url: {type: String, required: true},
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false},
    category: { type: String, required: true},
    author: { type: String, required: true},
    date: { type: String, required: true},
    likes: [
        {
            user: String,
        }
    ],
    likeTotal: { type: Number, default: 0 },

    comments: [ {
        user: String,
        text: String,
        date: { type: Date, default: Date.now }
    } ],
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;