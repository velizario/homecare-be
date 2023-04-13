import express from "express";
import { protect } from "../controllers/authController";
import { cancelOrder, createOrder, getAllOrders, getOrder, publishOrderComment, updateOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/createOrder", createOrder);

router.post("/updateOrder", updateOrder);

router.get("/getOrder/:id", getOrder);

router.get("/getAllOrders", protect, getAllOrders);

router.patch("/cancelOrder/:id", protect, cancelOrder);

router.post("/addComment", publishOrderComment);

export default router;