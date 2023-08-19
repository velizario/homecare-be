"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
// let jsonData = require('C:/Users/velizar.stoyanov/Downloads/test.json');
// jsonData.features.map((feature: any) => 
// feature.properties.type_kv === "1" && geoLocations.push(feature.properties.kvname.split(". ").slice(-1)[0]
// ))
const getDistricts = async function () {
    const geoLocations = [];
    let blobData = await (0, node_fetch_1.default)("https://api.sofiaplan.bg/datasets/297");
    const textData = await (await blobData.blob()).text();
    const jsonData = JSON.parse(textData);
    jsonData.features.map((feature) => feature.properties.type_kv === "1" && geoLocations.push(feature.properties.kvname.split(". ").slice(-1)[0]));
    return geoLocations;
};
exports.default = getDistricts;
