import express from "express";
import { protect } from "../controllers/authController";
import { changeOrderStatus, createOrder, upsertEvent, getAllOrders, getEvents, getOrder, publishOrderComment, updateOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/createOrder", createOrder);

router.get("/getOrder/:id", getOrder);

router.get("/getAllOrders", protect, getAllOrders);

router.patch("/changeOrderStatus/:id", protect, changeOrderStatus);

router.post("/updateOrder", updateOrder);

router.post("/addComment", publishOrderComment);

router.post("/upsertEvent", upsertEvent);

router.get("/getEvents", getEvents);

export default router;