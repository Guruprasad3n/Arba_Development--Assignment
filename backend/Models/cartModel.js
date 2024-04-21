const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

const userCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

const userCartModel = mongoose.model("Cart", userCartSchema);
module.exports = userCartModel;

// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   description: {
//     type: String,
//     required: true,
//   },
// });

// const cartModel = mongoose.model("Cart", cartSchema);
// module.exports = cartModel;
