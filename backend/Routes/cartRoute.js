const express = require('express');
const { addToCart } = require('../Controllers/cartController');
const router = express.Router();

// POST route to add a product to the user's cart
router.post('/add-to-cart', addToCart);

module.exports = router;
