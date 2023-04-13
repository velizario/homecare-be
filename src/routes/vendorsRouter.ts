import express from "express";
import { flattenUserData } from "../controllers/flattenUserData";
import { getVendorById } from "../controllers/vendorController";



// Instantiate Router
const router = express.Router();

router.route("/:id").get(getVendorById);

export default router;
