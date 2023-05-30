import express from "express";
import fileUpload from "express-fileupload";
import { protect } from "../controllers/authController";
import { imageUploadFS } from "../controllers/fileController";
import { getVendorById, getVendors, updatePortfolioImage, updatePortfolio, deletePortfolioImage, findVendors } from "../controllers/vendorController";
import { IMAGE_PATH } from "../utils/staticData";

// Instantiate Router
const router = express.Router();

router.route("/getVendors").get(getVendors);

router.route("/getVendor/:id").get(getVendorById);

router.route("/findVendors").post(findVendors);

router.route("/updatePortfolio").patch(protect, updatePortfolio);

// Fileupload
router.use(
  fileUpload({
    limits: {
      fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
  })
);

router.post("/upload", protect, imageUploadFS, updatePortfolioImage);

router.patch("/deleteImage", protect, deletePortfolioImage);

// add protect
router.use("/public", express.static(IMAGE_PATH));

export default router;
