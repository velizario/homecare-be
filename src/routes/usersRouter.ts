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

// Update user
router.get("/userGet", protect, getLoggedInUser);

// get image route
// let options = {
//   dotfiles: "ignore",
//   etag: false,
//   extensions: ["htm", "html"],
//   index: false,
//   maxAge: "1d",
//   redirect: false,
// };

router.route("/:id").get(getUser).patch(updateUser);
// .delete(protect, restrictTo(Role.ADMIN), deleteUser);

// Use the express-fileupload middleware
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
