const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    productId: Number,
    saleDate: Date,
    salesRep: String,
    region: String,
    salesAmount: Number,
    quantitySold: Number,
    productCategory: String,
    unitCost: Number,
    unitPrice: Number,
    customerType: String,
    discount: Number,
    paymentMethod: String,
    salesChannel: String
});

module.exports = mongoose.model("Sale", saleSchema);