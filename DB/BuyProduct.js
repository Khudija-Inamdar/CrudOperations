const mongoose = require("mongoose");

const BuySche = new mongoose.Schema({
    userId: String,
    name: String,
    price: String,
    category: String,
    company: String,
    quntity: String,
    bill: String
})

module.exports = mongoose.model('buyproducts', BuySche);