const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },
    owner: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;

// name : string
// slug : string
// image: string
// owner: Ref<User>
