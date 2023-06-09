//Task 1: Mongoose Schema and Model


const mongoose = require('mongoose');

// Defining schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Creating model
const Product = mongoose.model('Product', productSchema);

// Export
module.exports = Product;




//Task 2: Express.js Route

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET request to '/products'
router.get('/products', async (req, res) => {
  try {
       const products = await Product.find({}, 'name price');
       res.json(products);
  } catch (error) {
  
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;



//Task 3: JSON Web Tokens (JWT)

const jwt = require('jsonwebtoken');

function generateToken(userId, secretKey) {
  const payload = { userId };

  // Generate token with the provided user ID & secret key
  const token = jwt.sign(payload, secretKey);

  return token;
}



//Task 4: Express.js Middleware


const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  
  const token = req.headers.authorization;

  if (!token) {
   
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    
    const decoded = jwt.verify(token, 'your-secret-key');

   
    req.user = decoded;

   
    next();
  } catch (error) {
  
    return res.status(401).json({ error: 'Unauthorized' });
  }
}



