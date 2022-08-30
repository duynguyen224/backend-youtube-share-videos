const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        imageUrl: {
            type: String,
            minLength: 6,
        },
        googleId: {
            type: String,
            minLength: 6,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
