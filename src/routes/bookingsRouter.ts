import * as express from "express";
import {
  
  login,
  protect,
} from "../controllers/authController";
import {
  getBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController";

const router = express.Router();

router.route("/").get(getBookings);

router.route("/").post(createBooking);


router
  .route("/:id")
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking)

export default router;
