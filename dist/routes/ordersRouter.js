"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post("/createOrder", orderController_1.createOrder);
router.get("/getOrder/:id", orderController_1.getOrder);
router.get("/getAllOrders", authController_1.protect, orderController_1.getAllOrders);
router.patch("/changeOrderStatus/:id", authController_1.protect, orderController_1.changeOrderStatus);
router.post("/updateOrder", orderController_1.updateOrder);
router.post("/addComment", orderController_1.publishOrderComment);
router.post("/upsertEvent", orderController_1.upsertEvent);
router.get("/getEvents", orderController_1.getEvents);
exports.default = router;
