import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    mileageThreshold: {
      type: Number,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

reminderSchema.methods.isDue = function (currentDate, currentMileage) {
  return this.dueDate >= currentDate || this.mileageThreshold >= currentMileage;
};

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
