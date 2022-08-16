const bcrypt = require("bcrypt");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const authController = {
    // register: async (req, res) => {
    //     try {
    //         const salt = await bcrypt.genSalt(10);
    //         const hashed = await bcrypt.hash(req.body.password, salt);
    //         const newUser = await new User({
    //             username: req.body.username,
    //             email: req.body.email,
    //             password: hashed
    //         });

    //         const user = await newUser.save();
    //         res.status(200).json(user);
    //     }catch(err) {
    //         console.log(err)
    //         res.status(500).json(err);
    //     }
    // },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                // Add new user to db
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    imageUrl: req.body.imageUrl,
                    googleId: req.body.googleId,
                });
                await newUser.save();
                res.status(200).json(newUser);
            } else {
                res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = authController;
