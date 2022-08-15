const mongoose = require("mongoose");

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
    },
    { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
