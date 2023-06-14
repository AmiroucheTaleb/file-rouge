import mongoose from "mongoose";

const { Schema, model } = mongoose;
const subcategorySchema = new Schema({
  name: {
    type: String,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
const subcategory = new model("Subcategory", subcategorySchema);
export default subcategory;
