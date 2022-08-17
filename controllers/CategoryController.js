const bcrypt = require("bcrypt");
const Category = require("../models/Category");
const dotenv = require("dotenv");
const Video = require("../models/Video");

dotenv.config();

const categoryController = {
    getList: async (req, res) => {
        try {
            const videos = await Video.find({});
            const categories = await Category.find({});
            let results =  videos.map((item, index) => {
                const category = categories.find(({id}) => id === item.snippet.categoryId)
                if(category){
                    return category;
                }
            })
            results = [...new Set(results)];
            res.status(200).json(results);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = categoryController;
