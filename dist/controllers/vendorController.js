"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePortfolioImage = exports.updatePortfolioImage = exports.updatePortfolio = exports.findVendors = exports.getVendors = exports.getVendorById = void 0;
const vendorRepository_1 = __importDefault(require("../dao/vendorRepository"));
const Entities_1 = require("../entity/Entities");
const appError_1 = __importDefault(require("../utils/appError"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.getVendorById = (0, errorHandler_1.default)(async (req, res, next) => {
    const vendorId = Number(req.params.id);
    const vendor = await vendorRepository_1.default.findVendorById(vendorId);
    if (!vendor)
        return next(new appError_1.default("Vendor does not exist exists", 401));
    // Proper response handling!!!
    res.status(201).json({
        status: "success",
        data: vendor,
    });
});
exports.getVendors = (0, errorHandler_1.default)(async (req, res, next) => {
    const vendors = await vendorRepository_1.default.findAllVendors();
    if (!vendors)
        return next(new appError_1.default("No vendors found", 401));
    res.status(201).json({
        status: "success",
        data: vendors,
    });
});
exports.findVendors = (0, errorHandler_1.default)(async (req, res, next) => {
    const searchArg = req.body;
    const vendors = await vendorRepository_1.default.findVendors(searchArg);
    if (!vendors)
        return next(new appError_1.default("No vendors found", 401));
    res.status(201).json({
        status: "success",
        data: vendors,
    });
});
exports.updatePortfolio = (0, errorHandler_1.default)(async (req, res, next) => {
    // getting the logged in vendor Id and adding it to the portfolio
    const vendor = await vendorRepository_1.default.findVendorById(res.user.vendorId);
    if (!vendor)
        return;
    vendor.portfolio = req.body.services;
    vendor.isAdhocEnabled = req.body.isAdhocEnabled;
    vendor.isSubscriptionEnabled = req.body.isSubscriptionEnabled;
    const updatedPortfolio = await vendorRepository_1.default.updateVendor(vendor);
    if (!updatedPortfolio)
        return next(new appError_1.default("Error updating", 401));
    res.status(201).json({
        status: "success",
        data: updatedPortfolio,
    });
});
exports.updatePortfolioImage = (0, errorHandler_1.default)(async (req, res, next) => {
    // getting the logged in vendor Id and adding it to the portfolio
    if (!req.files)
        return next(new appError_1.default("no file!", 400));
    if (!res.user)
        return next(new appError_1.default("User is not attached to response!", 500));
    const vendorId = res.user.vendorId;
    const imageCandidate = req.files.uploadCandidate;
    const portfolioImages = await vendorRepository_1.default.getPortfolioImages(vendorId);
    // if (portfolioImages.length >= 12) {
    //   res.status(200).json({
    //     status: "Max number ofimages reached",
    //     data: {},
    //   });
    //   return;
    // }
    const imageExists = portfolioImages.find((image) => image.imgUrl === imageCandidate.name);
    if (imageExists) {
        res.status(200).json({
            status: "Image exists",
            data: {},
        });
        return;
    }
    const portfolioImage = new Entities_1.PortfolioImage();
    portfolioImage.imgUrl = imageCandidate.name;
    portfolioImage.vendor = { id: vendorId };
    const resData = await vendorRepository_1.default.addPortfolioImage(portfolioImage);
    if (!resData)
        res.status(400).json({ status: 400, data: "appliation error" });
    else
        res.status(resData.code).json({
            status: resData.status,
            data: resData.data,
        });
});
exports.deletePortfolioImage = (0, errorHandler_1.default)(async (req, res, next) => {
    if (!req.body)
        return next(new appError_1.default("no file!", 400));
    if (!res.user)
        return next(new appError_1.default("User is not attached to response!", 500));
    const vendorId = res.user.vendorId;
    const imageCandidate = req.body;
    const images = await vendorRepository_1.default.getPortfolioImages(vendorId);
    const numberOfImages = images.length;
    const filteredImages = images.filter((image) => image.id !== imageCandidate.id);
    if (numberOfImages === filteredImages.length) {
        res.status(404).json({
            status: "Not found",
            data: {},
        });
        return;
    }
    const resData = await vendorRepository_1.default.deletePortfolioImage(imageCandidate);
    if (resData.affected !== 1)
        return next(new appError_1.default("Error updating", 401));
    res.status(201).json({
        status: "success",
        data: filteredImages,
    });
});
