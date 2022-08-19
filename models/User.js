const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            require: false,
        },
        refreshToken: {
            type: String,
            require: false,
        },
        imageUrl: {
            type: String,
            required: false,
            minLength: 6,
        },
        googleId: {
            type: String,
            required: false,
            minLength: 6,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
