import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/ticketMiddleware.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérification des champs
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    // Vérification si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Création de l'utilisateur
    const user = await User.create({
      name,
      email,
      password,
    });
    const token = generateToken(user._id);
    // Réponse
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
     
      
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default router;
