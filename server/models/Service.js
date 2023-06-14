import mongoose from "mongoose";

const options = {
  timestamps: true,
};
const ServiceSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    serviceRecord_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRecord",
      required: true,
    },
  },
  options
);

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
