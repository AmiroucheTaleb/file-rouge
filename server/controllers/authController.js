import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    return res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    const token = generateToken(userFound);

    return res.status(200).json({ user: userFound, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la connexion de l'utilisateur",
    });
  }
};

export { register, login };
