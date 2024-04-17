
const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    image: {
      type: String,
      require: true,
      unique: true,
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

const categoryModel = model("Category", categorySchema);

module.exports =  categoryModel;




// name : string
// slug : string
// image: string
// owner: Ref<User>