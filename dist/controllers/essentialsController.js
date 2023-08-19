"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatuses = exports.getDistrictNames = exports.getServiceTypes = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const essentialsRepository_1 = __importDefault(require("../dao/essentialsRepository"));
exports.getServiceTypes = (0, errorHandler_1.default)(async (req, res, next) => {
    const serviceTypes = await essentialsRepository_1.default.findAllServiceTypes();
    res.status(201).json({
        status: "success",
        data: serviceTypes,
    });
});
exports.getDistrictNames = (0, errorHandler_1.default)(async (req, res, next) => {
    const districtNames = await essentialsRepository_1.default.findAllDistrictNames();
    res.status(201).json({
        status: "success",
        data: districtNames,
    });
});
exports.getOrderStatuses = (0, errorHandler_1.default)(async (req, res, next) => {
    const orderStatuses = await essentialsRepository_1.default.findOrderstatuses();
    res.status(201).json({
        status: "success",
        data: orderStatuses,
    });
});
