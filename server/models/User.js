import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  f_name: {
    type: String,
    default: "",
  },
  l_name: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  cars: [
    {
      car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
