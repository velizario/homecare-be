import * as express from "express";
import { login, } from "../controllers/authController";
import { getAllUsers, getUser, updateUser, deleteUser, signup, } from "../controllers/userController";
// User Router
const router = express.Router();
// router.route("/featured").get(featured, getAllUsers);
// Signup route
router.post("/signup", signup);
// login route
router.post("/login", login);
// router.route("/").get(protect, getAllUsers);
router.route("/").get(getAllUsers);
// router.get("/validate", protect, (req, res, next) => {
//   res.send(req.User);
// });
router
    .route("/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
// .delete(protect, restrictTo(Role.ADMIN), deleteUser);
export default router;
