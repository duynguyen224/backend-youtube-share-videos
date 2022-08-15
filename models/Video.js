const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength:6,
        maxLength: 40,
        unique: true
    },
    //TODO: 
},  {timestamps: true})

module.exports =mongoose.model('User', videoSchema);