import mongoose from "mongoose";

const options = {
  discriminatorKey: "type",
};
const ServiceRecordSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    voiture_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  options
);

const ServiceRecord = mongoose.model("ServiceRecord", ServiceRecordSchema);

export default ServiceRecord;
