const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = "mongodb+srv://aarondixon:pS4UM2bZCPQb80nF@niloinventorymanagement.loeio.mongodb.net/?retryWrites=true&w=majority&appName=NILOInventoryManagement";

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));


// Define a schema and model for products
const productSchema = new mongoose.Schema({
    productName: String,
    location: String,
    subLocation: String,
    supplier: String,
    unitsInStock: Number,
    storageType: String,
    lastUpdated: String,
});

const Product = mongoose.model('Product', productSchema);

// API to get all products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// API to add a new product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
