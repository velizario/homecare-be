"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Class validator allows use of decorator based validation
// Validation conditions are entered as decorators in the typeORM class based entities and then used by validator to validate a data object against that class
const class_validator_1 = require("class-validator");
const appError_1 = __importDefault(require("./appError"));
async function validateObjToEntity(data, Entity) {
    // create new instance of the class against which data will be validated
    let instance = new Entity();
    // assign data to the instance
    Object.assign(instance, data);
    // validate data against instance type and decorator based conditions
    const errors = await (0, class_validator_1.validate)(instance);
    if (errors.length > 0)
        throw new appError_1.default("Validation error", 401, errors);
}
exports.default = validateObjToEntity;
