import * as express from "express";
import {
  login,
  protect,
} from "../controllers/authController";
import {
  getUser,
  updateUser,
  signup,
  // addVendor,
} from "../controllers/userController";

// User Router
const router = express.Router();

// router.route("/featured").get(featured, getAllUsers);

// Signup route
router.use("/signup", signup);

// login route
router.post("/login", login);

// add vendor route. Why would I need it?
// router.post("/addVendor/:id", addVendor);


// router.get("/validate", protect, (req, res, next) => {
//   res.send(req.User);
// });

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  // .delete(protect, restrictTo(Role.ADMIN), deleteUser);

export default router;
