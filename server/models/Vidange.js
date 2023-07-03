import mongoose from "mongoose";

const vidangeSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    oilType: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Vidange = mongoose.model("Vidange", vidangeSchema);

export default Vidange;
