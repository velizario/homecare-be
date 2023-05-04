import express from "express";
import { getVendorById } from "../controllers/vendorController";



// Instantiate Router
const router = express.Router();

router.route("/:id").get(getVendorById);

export default router;
