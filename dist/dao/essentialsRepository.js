"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnectorData_1 = require("../DBConnectorData");
const Entities_1 = require("../entity/Entities");
class EssentialsRepository {
    async findAllServiceTypes() {
        return await DBConnectorData_1.AppDataSource.manager.find(Entities_1.ServiceType);
    }
    async findAllVisitFrequencies() {
        return await DBConnectorData_1.AppDataSource.manager.find(Entities_1.VisitFrequency);
    }
    async findAllClientDayChoices() {
        return await DBConnectorData_1.AppDataSource.manager.find(Entities_1.ClientDayChoice);
    }
    async findOrderstatuses() {
        return await DBConnectorData_1.AppDataSource.manager.find(Entities_1.OrderStatus);
    }
    async findAllClientHourChoices() {
        return await DBConnectorData_1.AppDataSource.manager.find(Entities_1.ClientHourChoice);
    }
    async findAllEstateSizes() {
        return await DBConnectorData_1.AppDataSource.manager.find(Entities_1.EstateSize);
    }
    async findAllDistrictNames() {
        return await DBConnectorData_1.AppDataSource.manager.find(Entities_1.DistrictName);
    }
}
const EssentialsDBHandler = new EssentialsRepository();
exports.default = EssentialsDBHandler;
