import express from "express";
import { protect } from "../controllers/authController";
import { cancelOrder, createOrder, getAllOrders, getOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/createOrder", createOrder);

router.get("/getOrder/:id", getOrder);

router.get("/getAllOrders", protect, getAllOrders);

router.patch("/cancelOrder/:id", protect, cancelOrder);

export default router;