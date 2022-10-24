import * as express from "express";
import {
  
  login,
  protect,
} from "../controllers/authController";
import {
  getUser,
  updateUser,
  signup,
} from "../controllers/userController";

// User Router
const router = express.Router();

// router.route("/featured").get(featured, getAllUsers);

// Signup route
router.post("/signup", signup);

// login route
router.post("/login", login);


// router.get("/validate", protect, (req, res, next) => {
//   res.send(req.User);
// });

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  // .delete(protect, restrictTo(Role.ADMIN), deleteUser);

export default router;
