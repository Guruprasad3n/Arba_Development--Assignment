const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const productModel = model("Product", productSchema);

module.exports = productModel;
// title : string
// description : string
// price : number
// category : Ref<Category>
// image: string
// owner: Ref<User>
