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
require("./types/declarations");
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.resolve(__dirname, "../.env") });
const DBConnectorData_1 = require("./DBConnectorData");
const app_1 = require("./app");
const seedEssentialDataRepository_1 = __importDefault(require("./dao/seeds/seedEssentialDataRepository"));
const PORT = process.env.PORT || 9000;
DBConnectorData_1.AppDataSource.initialize()
    .then(async () => {
    console.log(`Connected to DB on host ${"localhost"}`);
    // Run seeds
    // NOTE: uncomment to rerun seeds
    seedEssentialDataRepository_1.default.updateAllSeeds();
    // Start the server
    app_1.app.listen(PORT, () => {
        console.log(`App running on PORT ${PORT}...`);
    });
})
    .catch((error) => console.log(error));
async function main() { }
main();
// .then(async () => {
//   await prisma.$disconnect();
// })
// .catch(async (e) => {
//   console.error(e);
//   await prisma.$disconnect();
//   process.exit(1);
// }
// );
