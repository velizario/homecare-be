"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validatePassword = async function (password, candidatePassword) {
    const compare = await bcryptjs_1.default.compare(password, candidatePassword);
    return compare;
};
exports.default = validatePassword;
