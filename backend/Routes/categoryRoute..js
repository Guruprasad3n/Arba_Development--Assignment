const express = require("express");
const { createCategory, updateCategory, allCategory, singleCategory, deleteCategory } = require("../Controllers/categoryController");

const router = express.Router();

router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);
router.get("/all-categories", allCategory);
router.get("/signle-category/:slug", singleCategory )
router.delete("/delete-category/:id",  deleteCategory)

module.exports = router;
