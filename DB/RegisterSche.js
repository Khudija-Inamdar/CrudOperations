const mongoose = require("mongoose");

const SignupSche = new mongoose.Schema({
    username:String,
    email:String,
    password:String
});

module.exports = mongoose.model('registers',SignupSche);