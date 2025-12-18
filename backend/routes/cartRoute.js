import express from "express";
import { addToCart, removeFromCart, deleteFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/add-to-cart", authMiddleware, addToCart);
router.post("/remove-from-cart", authMiddleware, removeFromCart);
router.post("/delete-from-cart", authMiddleware, deleteFromCart);
router.post("/get", authMiddleware, getCart);

export default router;
