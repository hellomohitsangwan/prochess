import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
} from "../controller/userController.js";
import { protect, adminMiddleware } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
