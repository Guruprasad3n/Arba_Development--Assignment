const productModel = require("../Models/productModel");
const categoryModel = require("../Models/categoryModel");
const fs = require("fs");
const slugify = require("slugify");
const cartModel = require("../Models/cartModel");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, owner } = req.body;
    if (!title || !description || !price || !category || !image || !owner) {
      return res
        .status(400)
        .send({ success: false, message: "Missing required fields" });
    }

    const slug = slugify(title);
    const products = new productModel({
      description,
      price,
      category,
      image,
      owner,
      title: slug,
    });
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
    const { productId } = req.params;
    const { userId } = req.user;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while adding to cart" });
  }
};

const userProducts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const products = await productModel.find({ owner: userId });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching user products:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user products" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
  addToCart,
  userProducts,
};
