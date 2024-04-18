const slugify = require("slugify");
const categoryModel = require("../Models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name Is Required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category Already Exist" });
    }

    const category = new categoryModel({ name, slug: slugify(name), image });
    await category.save();
    return res
      .status(201)
      .send({ success: true, message: "New Category Created", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Category", error });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), image },
      { new: true }
    );
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Update Category" });
  }
};

const allCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "All Category List Success Showing",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Getting All Categories",
      error,
    });
  }
};

const singleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    return res.status(200).send({
      success: true,
      message: "Get Single Category Success",
      category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in Getting Single Category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCateg = await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting Category",
      error,
    });
  }
};

// const userCategory = async (req, res) => {
//   try {
//     const userName = req.params.userId;
//     console.log(userId);
//     const products = await categoryModel.find({ owner: userName });
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     console.error("Error fetching user products:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error fetching user products" });
//   }
// };

module.exports = {
  createCategory,
  updateCategory,
  allCategory,
  singleCategory,
  deleteCategory,
};
