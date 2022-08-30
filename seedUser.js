const mongoose = require("mongoose");
const Category = require("./models/Category");
const User = require("./models/User");

const seedUser = async () => {
    await User.deleteMany({email: "test@gmail.com"});
    await User.insertMany(users);
};

const users = [
    {
        name: "I'm test user",
        email: "test@gmail.com",
        password:
            "$2b$10$4drSV8zdv9VWIbfC7B4OFeL.SyX5ACP5AgJ3b0/Qw7nWHkzPx7r4O", // 123456
        createdAt: "2022-08-19T06:11:09.330Z",
        updatedAt: "2022-08-19T06:11:09.330Z",
        imageUrl: "https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ=w240-h480-rw",
        refreshToken: "gDPtNg87869BLdTvfSUU3mBkrwKonMEA",
    }
];

module.exports = { seedUser };
