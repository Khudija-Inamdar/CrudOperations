const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/App");

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URL);
        // console.log("Database Connected");
    } catch (error) {
        console.log(`Error From Connection Database ${error}`);
    }
}

module.exports = ConnectDB;