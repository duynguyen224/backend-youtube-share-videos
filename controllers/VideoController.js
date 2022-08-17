const bcrypt = require("bcrypt");
const Video = require("../models/Video");
const dotenv = require("dotenv");
dotenv.config();

const videoController = {
    createVideo: async (req, res) => {
        try {
            const video = req.body.video;
            const user = req.body.user;

            const newVideo = new Video({
                id: video.id,
                snippet: {
                    publishedAt: video.snippet.publishedAt,
                    channelId: video.snippet.channelId,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnails: {
                        high: {
                            url: video.snippet.thumbnails.high.url,
                            width: video.snippet.thumbnails.high.width,
                            height: video.snippet.thumbnails.high.height,
                        },
                    },
                    channelTitle: video.snippet.channelTitle,
                    categoryId: video.snippet.categoryId,
                },
                statistics: {
                    viewCount: video.statistics.viewCount,
                    likeCount: video.statistics.likeCount,
                    favoriteCount: video.statistics.favoriteCount,
                    commentCount: video.statistics.commentCount,
                },
                createdBy: {
                    userId : user._id,
                    imageUrl: user.imageUrl,
                    username: user.name,
                }
            });
            await newVideo.save();
            res.status(200).json(newVideo);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getList: async (req, res) => {
        try {
            const videos = await Video.find({});
            res.status(200).json(videos);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    findByName: async (req, res) => {
        try {
            const result = await Video.find({'snippet.title' : { $regex : new RegExp(req.query.search, "i") }});
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    filterByCategory: async (req, res) => {
        try {
            const result = await Video.find({'snippet.categoryId' : req.query.categoryId});
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
};

module.exports = videoController;
