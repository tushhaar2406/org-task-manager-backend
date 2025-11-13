import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/index.js";

dotenv.config();

// Utility to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.user_id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, tech_stack } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
      tech_stack,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        tech_stack: newUser.tech_stack,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        tech_stack: user.tech_stack,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/users/all
export const getAllEmployees = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["user_id", "name", "email", "role", "tech_stack", "createdAt"],
      raw: true,
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json({
      message: "Employee list fetched successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get Employees Error:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};
