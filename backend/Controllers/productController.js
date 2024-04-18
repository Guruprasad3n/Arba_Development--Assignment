const productModel = require("../Models/productModel");
const categoryModel = require("../Models/categoryModel");
const fs = require("fs");
const slugify = require("slugify");
const cartModel = require("../Models/cartModel");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.fields;
    if (!title || !description || !price || !category || !image) {
      return res
        .status(400)
        .send({ success: false, message: "Missing required fields" });
    }

    const slug = slugify(title);
    const products = new productModel({ ...req.fields, title: slug });
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfull",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: false, message: "Error While Creating Product", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const products = await productModel
      .find({})
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCount = await productModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).send({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      message: "Get All Products Success",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Get All Products" });
  }
};
const singleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ title: req.params.title })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Getting Success",
      product,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Single Product", error });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productDelete = await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Delete Product Success",
      productDelete,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Delete Product" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.fields;
    if (!title || !description || !price || !category || !image) {
      return res
        .status(400)
        .send({ success: false, message: "Missing required fields" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, title: slugify(title) },
      { new: true }
    );
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfull",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error In Update Product" });
  }


};

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is passed in the URL
    const { userId } = req.user; // Assuming userId is available in the request object after authentication

    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    // Find the user and update their cart
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    // Add the product to the user's cart
    user.cart.push(productId);
    await user.save();

    res.status(200).send({
      success: true,
      message: "Product added to cart successfully",
      product,
      user: {
        id: user._id,
        username: user.username,
        // Include other user details as needed
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error while adding to cart" });
  }
};


// const addToCart = async (req, res) => {
//   const { productId, price, owner, description } = req.body;
//   try {
//     if (!productId || !price || !owner || !description) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Missing required fields" });
//     }

//     const product = await productModel.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .send({ success: false, message: "Product not found" });
//     }
//     const cart = new cartModel({
//       productId: product._id,
//       price: req.body.price,
//       owner: req.body.owner,
//       description: req.body.description,
//     });
//     await cart.populate('owner');
//     await cart.populate('productId');

//     await cart.save();
//     return res
//       .status(200)
//       .send({ success: true, message: "Product Added to the Cart", cart });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send({ success: false, message: "Error In Adding to the Cart" });
//   }
// };

module.exports = {
  createProduct,
  getAllProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
  addToCart,
};
