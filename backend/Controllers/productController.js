const productModel = require("../Models/productModel");
const categoryModel = require("../Models/categoryModel");
const fs = require("fs");
const slugify = require("slugify");

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
    const products = await productModel
      .find({})
      .populate("category")
      .limit(8)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
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

module.exports = {
  createProduct,
  getAllProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
};
