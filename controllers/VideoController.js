const bcrypt = require('bcrypt');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const videoController = {
    createVideo: async (req, res) => {
        try {
           
            const newVideo = await new Video({
                title: req.body.title,
              // ...
            });

            const response = await newVideo.save();
            res.status(200).json(response);
        }catch(err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    getList : async (req, res) => {
        try {
            res.status(200).json([]);
        }catch(err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
}

module.exports = videoController;