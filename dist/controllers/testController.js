"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testApi = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const DBConnectorData_1 = require("../DBConnectorData");
const Entities_1 = require("../entity/Entities");
exports.testApi = (0, errorHandler_1.default)(async (req, res, next) => {
    const resData = DBConnectorData_1.AppDataSource.manager.save(Entities_1.Event, { id: "1" });
    // const resData = await AppDataSource.query(`
    // select to_json(res) "client" from 
    // (
    // SELECT c.*, to_json(o) "order" 
    //     FROM "order" o
    // LEFT JOIN "client" c ON c.id = o."clientId" 
    // ) res
    // `);
    res.status(201).json({
        status: "success",
        data: resData,
    });
});
