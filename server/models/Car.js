import mongoose from "mongoose";

const { Schema } = mongoose;

const vehicleSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Vehicle = mongoose.model("Car", vehicleSchema);

export default Vehicle;
