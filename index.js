const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const videoRoute = require("./routes/video");
const categoryRoute = require("./routes/category")
const axios = require("axios");
const { seedCategory } = require("./seedCategory");
const { seedUser } = require("./seedUser");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, (err) => {
    if (err) console.log("Error: ", err);
    else console.log("DB Connected!");
});

// seed category
seedCategory();
// seed user
seedUser();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/videos", videoRoute);
app.use("/v1/categories", categoryRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
