const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads your .env file

// Import your database models (blueprints)
const Product = require('./models/Product');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); 
app.use(cors()); 

// --- MongoDB Connection --- //
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Database!'))
    .catch((err) => console.log('❌ Database connection error:', err));

// --- API Routes --- //

// 1. Fetch all products from MongoDB
app.get('/api/products', async (req, res) => {
    try {
        // This looks inside the 'products' collection in your cloud database
        const products = await Product.find({});
        res.json(products); // Sends the live database items back to the frontend
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error while fetching products' });
    }
});

// A base route just to make sure the server works
app.get('/', (req, res) => {
    res.send('4ce Anik Anik API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});