"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnectorData_1 = require("../../DBConnectorData");
const Entities_1 = require("../../entity/Entities");
const staticData_1 = require("../../utils/staticData");
class seedEssentialDataRepository {
    async updateAllSeeds() {
        // await SeedServiceTypeRepository.save(seedServiceTypeData);
        await DBConnectorData_1.AppDataSource.manager.save(Entities_1.ServiceType, staticData_1.seedServiceTypeData);
        await DBConnectorData_1.AppDataSource.manager.save(Entities_1.VisitFrequency, staticData_1.seedVisitFrequencyData);
        await DBConnectorData_1.AppDataSource.manager.save(Entities_1.ClientDayChoice, staticData_1.seedWeekDayData);
        await DBConnectorData_1.AppDataSource.manager.save(Entities_1.OrderStatus, staticData_1.seedOrderStatusData);
        await DBConnectorData_1.AppDataSource.manager.save(Entities_1.ClientHourChoice, staticData_1.seedHourDayData);
        await DBConnectorData_1.AppDataSource.manager.save(Entities_1.EstateSize, staticData_1.seedEstateSizeData);
        await DBConnectorData_1.AppDataSource.manager.save(Entities_1.DistrictName, staticData_1.seedDistrictNameData);
    }
}
const SeedsImpl = new seedEssentialDataRepository();
exports.default = SeedsImpl;
