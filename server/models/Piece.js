import mongoose from "mongoose";

const pieceSchema = new mongoose.Schema(
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
    replacements: [
      {
        partName: {
          type: String,
          required: true,
        },
        partNote: {
          type: String,
        },
        cost: {
          type: Number,
          required: true,
        },
      },
    ],
    notes: {
      type: String,
    },
    laborCost: {
      type: Number,
      required: true,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Piece = mongoose.model("Piece", pieceSchema);

export default Piece;
