import * as express from "express";
import { getEssentialData } from "../controllers/essentialsController";


const router = express.Router();

// Services route
router.get("/getEssentialData", getEssentialData);


export default router;
