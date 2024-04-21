const UserCart = require('../Models/cartModel');
const productModel = require('../Models/productModel');
const userModel = require('../Models/userModel');

// Controller function to add a product to the user's cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user exists
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Query the product from the database
    const product = await productModel.findById({productId:_id});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product already exists in the user's cart
    let userCart = await UserCart.findOne({ userId });
    if (!userCart) {
      // If the user's cart doesn't exist yet, create a new one
      userCart = new UserCart({
        userId,
        items: [],
      });
    }

    // Check if the product already exists in the cart items
    const cartItemIndex = userCart.items.findIndex(item => String(item.productId) === productId);
    if (cartItemIndex !== -1) {
      // If the product exists in the cart, update the quantity
      userCart.items[cartItemIndex].quantity += quantity;
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      userCart.items.push({
        productId,
        product,
        quantity,
      });
    }

    // Save the updated user cart
    await userCart.save();

    res.status(200).json({ message: 'Product added to cart successfully', userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToCart };
