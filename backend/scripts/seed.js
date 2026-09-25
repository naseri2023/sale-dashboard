const fs = require('fs');
const csv = require('csv-parser');
const Sale = require('../models/Sale');
const connectDB = require('../config/db')
const cleanData = require("../utils/cleanData");

const results = [];

function seedData() {
    try {
        fs.createReadStream('./data/sales_data.csv')
            .pipe(csv())
            .on('data', (row) => {

                const convertedData = {
                    productId: Number(row.Product_ID),
                    saleDate: new Date(row.Sale_Date),
                    salesRep: row.Sales_Rep,
                    region: row.Region,
                    salesAmount: Number(row.Sales_Amount),
                    quantitySold: Number(row.Quantity_Sold),
                    productCategory: row.Product_Category,
                    unitCost: Number(row.Unit_Cost),
                    unitPrice: Number(row.Unit_Price),
                    customerType: row.Customer_Type,
                    discount: Number(row.Discount),
                    paymentMethod: row.Payment_Method,
                    salesChannel: row.Sales_Channel
                }
                results.push(convertedData);
            })
            .on('end', async () => {
                console.log('تعداد ردیف‌های کل:', results.length);
                const cleanedResults = cleanData(results);
                try {
                    await Sale.insertMany(cleanedResults)
                    console.log('Successfully inserted')
                } catch (err) {
                    console.log("error message: ", err)}
            });

    } catch (error) {
        console.log("error message : ", error.message);
    }
}

connectDB().then(seedData)

