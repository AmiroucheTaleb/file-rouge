import mongoose from "mongoose";

const { Schema } = mongoose;

const carSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ["diesel", "essence"],
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
