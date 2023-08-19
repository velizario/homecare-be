"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenUserData = void 0;
const mapValues_1 = __importDefault(require("lodash/mapValues"));
// TODO unnecessary - remove
const flattenUserData = (data) => {
    // Flatten by taking out 'vendor' and 'client'.
    // Strip off password (anything else?) as sensitive data to prepare for the frontend
    const { vendor, client, password, ...rest } = data;
    const userDataFlat = Object.assign({}, vendor, client, rest);
    // let userData = {} as Record<string, any>
    // for (const [key, value] of Object.entries(userDataFlat)) {
    //   value === null ? (userData[key] = "") : (userData[key] = value);
    // }
    // replace null values with ""
    const userDataParsed = (0, mapValues_1.default)(userDataFlat, value => value === null ? "" : value);
    // Object.keys(userDataFlat).forEach(key => userDataFlat[key as keyof FlattenedUser]==='null' && (userDataFlat[key as keyof FlattenedUser] = ""))
    return userDataParsed;
};
exports.flattenUserData = flattenUserData;
