const express = require("express");
const formidable = require("express-formidable");
const {
  createProduct,
  getAllProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
  addToCart,
} = require("../Controllers/productController");
const requireSignIn = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/create-product", formidable(), createProduct);

router.get("/get-products", getAllProducts);
router.get("/get-product/:title", singleProduct);

// router.get("/product-photo/:id", getProductPhoto);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", formidable(), updateProduct);
router.post("/add-to-cart", requireSignIn, addToCart);
module.exports = router;
