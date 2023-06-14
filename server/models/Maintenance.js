import mongoose from "mongoose";
import ServiceRecord from "./serviceRecord.js";
const { Schema, model } = mongoose;

const options = {
  discriminatorKey: "type",
};
const maintenanceSchema = new Schema(
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

const Maintenance = ServiceRecord.discriminator("Maintenance", maintenanceSchema);

export default Maintenance;
