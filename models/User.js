const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        imageUrl: {
            type: String,
            required: true,
            minLength: 6,
        },
        googleId: {
            type: String,
            required: true,
            minLength: 6,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
