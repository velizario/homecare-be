"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const authController_1 = require("../controllers/authController");
const fileController_1 = require("../controllers/fileController");
const vendorController_1 = require("../controllers/vendorController");
const staticData_1 = require("../utils/staticData");
// Instantiate Router
const router = express_1.default.Router();
router.route("/getVendors").get(vendorController_1.getVendors);
router.route("/getVendor/:id").get(vendorController_1.getVendorById);
router.route("/findVendors").post(vendorController_1.findVendors);
router.route("/updatePortfolio").patch(authController_1.protect, vendorController_1.updatePortfolio);
// Fileupload
router.use((0, express_fileupload_1.default)({
    limits: {
        fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
}));
router.post("/upload", authController_1.protect, fileController_1.imageUploadFS, vendorController_1.updatePortfolioImage);
router.patch("/deleteImage", authController_1.protect, vendorController_1.deletePortfolioImage);
// add protect
router.use("/public", express_1.default.static(staticData_1.IMAGE_PATH));
exports.default = router;
