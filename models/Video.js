const mongoose = require("mongoose");
const User = require("./User");

const videoSchema = new mongoose.Schema(
    {
        id: String,
        snippet: {
            publishedAt: Date,
            channelId: String,
            title: String,
            description: String,
            thumbnails: {
                high: {
                    url: String,
                    width: Number,
                    height: Number,
                },
            },
            channelTitle: String,
            categoryId: Number,
        },
        statistics: {
            viewCount: Number,
            likeCount: Number,
            favoriteCount: Number,
            commentCount: Number,
        },
        createdBy: {
            userId: mongoose.SchemaTypes.ObjectId,
            username: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
