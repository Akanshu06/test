const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./src/config/mysql');
require('dotenv').config()
const categoryRoutes  = require('./src/routes/category');
const authRoutes = require('./src/routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use('/api/category', categoryRoutes);
const port = 3000 || process.env.PORT;


const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database connected successfully.');
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

startServer();
