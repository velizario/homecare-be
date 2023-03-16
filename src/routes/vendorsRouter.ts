import express from "express";
import { flattenUserData } from "../controllers/flattenUserData";
import { getUser } from "../controllers/userController";



// Instantiate Router
const router = express.Router();

router.route("/:id").get(getUser, flattenUserData);

export default router;
