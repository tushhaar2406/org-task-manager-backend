import express from "express";
import {
  registerUser,
  loginUser,
  getAllEmployees,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all",authMiddleware,getAllEmployees);

export default router;
