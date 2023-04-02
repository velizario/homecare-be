import * as express from "express";
import { getAllServices } from "../controllers/essentialsController";


const router = express.Router();

// Services route
router.get("/getServices", getAllServices);


export default router;
