require('dotenv').config();
const connectDB = require('./config/db')
const express = require("express");
const cors = require("cors");

const salesRoutes = require("./routes/sales");
const authRouter = require('./routes/auth');

const app = express();

connectDB().then(() => {
    app.listen(8000, () => console.log('Server running'));
});

app.use(express.json());
app.use(cors())

app.use('/sales',salesRoutes)
app.use('/auth', authRouter);