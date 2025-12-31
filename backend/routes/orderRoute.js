import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeorder, userOrders, verifyOrder } from "../controllers/orderController.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeorder);
orderRouter.post("/verify",authMiddleware,verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);

export default orderRouter;