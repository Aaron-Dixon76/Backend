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
    productName: { type: String, required: true },
    location: { type: String, required: true },
    subLocation: { type: String, required: true },
    supplier: { type: String, required: true },
    unitsInStock: { type: Number, required: true, min: 0 },
    storageType: { type: String, required: true },
    lastUpdated: { type: String, required: true },
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
