const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect('mongodb://localhost:27017/salesDashboard')
           console.log('Connected to MongoDB')
    } catch (error) {
        console.log("error message: ",error)
        process.exit(1);
    }
}

module.exports = connectDB;