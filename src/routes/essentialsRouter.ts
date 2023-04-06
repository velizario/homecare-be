import * as express from "express";
import { getDistrictNames, getServiceTypes } from "../controllers/essentialsController";


const router = express.Router();

// Services route
router.get("/getServiceTypes", getServiceTypes);

// Services route
router.get("/getDistrictNames", getDistrictNames);


export default router;
