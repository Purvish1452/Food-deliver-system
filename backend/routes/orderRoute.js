import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeorder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders); // admin
orderRouter.post("/staus",updateStatus);


export default orderRouter;
