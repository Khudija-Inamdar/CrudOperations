const mongoose = require("mongoose");

const ProductSche = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    subcategory:String,
    userId: String,
    company: String,
    quntity: String
});

module.exports = mongoose.model('products', ProductSche);