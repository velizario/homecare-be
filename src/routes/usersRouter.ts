import * as express from "express";
import { login, protect } from "../controllers/authController";
import {
  getUser,
  updateUser,
  signup,
  imageUpload,
  getLoggedInUser,
  // addVendor,
} from "../controllers/userController";
import fileUpload from "express-fileupload";
import { IMAGE_PATH } from "../utils/staticData";

// User Router
const router = express.Router();

// router.route("/featured").get(featured, getAllUsers);

// Signup route
router.use("/userSignup", signup);

// login route
router.post("/userLogin", login);

// get user data route
router.get("/userGet", protect, getLoggedInUser);

// get and patch user
router.route("/:id").get(getUser).patch(updateUser);

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
