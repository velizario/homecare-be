"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadFS = void 0;
const mime_1 = __importDefault(require("mime"));
const appError_1 = __importDefault(require("../utils/appError"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const staticData_1 = require("../utils/staticData");
exports.imageUploadFS = (0, errorHandler_1.default)(async (req, res, next) => {
    var _a;
    if (!req.files)
        return next(new appError_1.default("no file!", 400));
    if (!res.user)
        return next(new appError_1.default("User is not attached to response!", 500));
    const image = req.files.uploadCandidate;
    if (!((_a = mime_1.default.getType(image.name)) === null || _a === void 0 ? void 0 : _a.includes("image")))
        return next(new appError_1.default("Not an image!", 500));
    image.mv(staticData_1.IMAGE_PATH + "/" + image.name, async (err) => {
        if (err)
            return next(new appError_1.default(err, 500));
        next();
    });
});
