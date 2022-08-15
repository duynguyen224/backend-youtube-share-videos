const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 40,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50,
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
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
