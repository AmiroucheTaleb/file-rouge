import mongoose from "mongoose";
import ServiceRecord from "./serviceRecord.js";

const { Schema } = mongoose;

const options = {
  discriminatorKey: "type",
};
const repairSchema = new Schema(
  {
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  options
);

const Repair = ServiceRecord.discriminator("Repair", repairSchema);

export default Repair;
