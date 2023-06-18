import User from "../models/User.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { f_name, l_name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "tu vient de louper des champs obligatoire" });
  //check if user exists
  try {
    const userExists = await User.exists({ email });
    if (userExists) return res.status(409).json({ message: "emails already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      f_name,
      l_name,
      email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user._id);
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Field Missing" });
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(401).json({ message: "Wrong username or password" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = generateAccessToken(foundUser._id);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err.message);
  }
};

//generate tokens
const generateAccessToken = (id) => {
  return jwt.sign(
    {
      UserInfo: {
        id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  ); //5-15 min
};

export const updateUser = async (req, res) => {
  const userID = req.user;
  const { l_name, f_name, email, phone } = req.body;
  try {
    const foundUser = await User.findByIdAndUpdate(
      userID,
      { l_name, f_name, email, phone },
      { returnDocument: "after", runValidators: true }
    );
    if (!foundUser) return res.status(404).json({ message: "unknown user" });
    res.status(202).json(foundUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  const userID = req.user;

  try {
    // const foundUser = await User.findById(userID);
    // if(!foundUser) return res.status(404).json({message: "user not found"});
    const foundUser = await User.getUser(userID);
    res.status(200).json(foundUser);
  } catch (err) {
    if (err.code === 404) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};
