import mongoose from "mongoose";

const { Schema, model } = mongoose;
const categorySchema = new Schema({
  name: {
    type: String,
  },
  //   parentCategory:
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Category",
  //     },
});
const Category = new model("Category", categorySchema);
export default Category;
