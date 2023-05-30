import * as express from "express";
import fileUpload from "express-fileupload";
import { login, protect, sendToken } from "../controllers/authController";
import { imageUploadFS } from "../controllers/fileController";
import { testApi } from "../controllers/testController";
import {
  changePassword, getUser, getUserAnonymously, imageProfileUpdate, signup, updateUser
} from "../controllers/userController";
import { IMAGE_PATH } from "../utils/staticData";

// User Router
const router = express.Router();

// router.route("/featured").get(featured, getAllUsers);

// Signup route
router.use("/raw", testApi);

export default router;
