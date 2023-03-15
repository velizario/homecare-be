import express from "express";
import { getVendor } from "../controllers/vendorController";


// Instantiate Router
const router = express.Router();

router.route("/:id").get(getVendor);

export default router;
