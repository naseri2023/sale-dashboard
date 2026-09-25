const User = require("../models/User");
const bcrypt = require('bcrypt');
const connectDB = require('../config/db')

async function seedAdmin() {

    try {
    const hashedPassword = await bcrypt.hash('admin', 10);

        await User.create({
            username: "admin",
            password: hashedPassword,
        });
        console.log("Admin account is created successfully ");
    } catch (err) {
        console.error("error for making admin account: ", err.message);
    }
}

connectDB().then(seedAdmin)