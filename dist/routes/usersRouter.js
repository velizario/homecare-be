"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const authController_1 = require("../controllers/authController");
const fileController_1 = require("../controllers/fileController");
const userController_1 = require("../controllers/userController");
const staticData_1 = require("../utils/staticData");
// User Router
const router = express.Router();
// router.route("/featured").get(featured, getAllUsers);
// Signup route
router.use("/userSignup", userController_1.signup, authController_1.sendToken);
// login route
router.post("/userLogin", authController_1.login, authController_1.sendToken);
// Authenticate route
router.get("/userAuthenticate", authController_1.protect, authController_1.sendToken);
// get user data route
router.get("/userGet", authController_1.protect, userController_1.getUser);
router.get("/userGet/:id", userController_1.getUserAnonymously);
router.patch("/passwordChange", authController_1.protect, userController_1.changePassword);
// get and patch user
router.route("/").get(authController_1.protect, userController_1.getUser).patch(authController_1.protect, userController_1.updateUser);
// Fileupload
router.use((0, express_fileupload_1.default)({
    limits: {
        fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
}));
router.post("/upload", authController_1.protect, fileController_1.imageUploadFS, userController_1.imageProfileUpdate);
// add protect
router.use("/public", express.static(staticData_1.IMAGE_PATH));
exports.default = router;
