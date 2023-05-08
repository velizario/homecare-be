import express from "express";
import { protect } from "../controllers/authController";
import { getVendorById, getVendors, updatePortfolio } from "../controllers/vendorController";



// Instantiate Router
const router = express.Router();

router.route("/getVendors").get(getVendors);

router.route("/getVendor/:id").get(getVendorById);

router.route("/updatePortfolio").patch(protect, updatePortfolio);

export default router;
