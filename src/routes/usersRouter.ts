import * as express from "express";
import fileUpload from "express-fileupload";
import { login, protect, sendToken } from "../controllers/authController";
import {
  changePassword, getUser, imageUpload, signup, updateUser
} from "../controllers/userController";
import { IMAGE_PATH } from "../utils/staticData";

// User Router
const router = express.Router();

// router.route("/featured").get(featured, getAllUsers);

// Signup route
router.use("/userSignup", signup, sendToken);

// login route
router.post("/userLogin", login, sendToken);

// Authenticate route
router.get("/userAuthenticate", protect, sendToken);

// get user data route
router.get("/userGet", protect, getUser);

router.patch("/passwordChange", protect, changePassword)

// get and patch user
router.route("/").get(protect, getUser).patch(protect, updateUser);


// Fileupload
router.use(
  fileUpload({
    limits: {
      fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
  })
);

router.post("/upload", protect, imageUpload);

// add protect
router.use("/public", express.static(IMAGE_PATH));

export default router;
