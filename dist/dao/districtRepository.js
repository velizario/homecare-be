"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.districtRepository = void 0;
const DBConnectorData_1 = require("../DBConnectorData");
const Entities_1 = require("../entity/Entities");
exports.districtRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.DistrictName);
class DistrictRepository {
    async findUserById(id) {
        return await exports.districtRepository.findOneBy({ id: id });
    }
    async findAllUsers() {
        return await exports.districtRepository.find();
    }
}
const districtDBHandler = new DistrictRepository();
exports.default = districtDBHandler;
