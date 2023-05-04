import { AppDataSource } from "../../DBConnectorData";
import { DistrictName, EstateSize, OrderStatus, ServiceType, ClientDayChoice, VisitFrequency, ClientHourChoice, User } from "../../entity/Entities";
import { seedDistrictNameData, seedEstateSizeData, seedOrderStatusData, seedServiceTypeData, seedWeekDayData, seedVisitFrequencyData, seedHourDayData } from "../../utils/staticData";

class seedEssentialDataRepository {
  async updateAllSeeds() {
    // await SeedServiceTypeRepository.save(seedServiceTypeData);
    await AppDataSource.manager.save(ServiceType, seedServiceTypeData)
    await AppDataSource.manager.save(VisitFrequency, seedVisitFrequencyData)
    await AppDataSource.manager.save(ClientDayChoice, seedWeekDayData)
    await AppDataSource.manager.save(OrderStatus, seedOrderStatusData)
    await AppDataSource.manager.save(ClientHourChoice, seedHourDayData)
    await AppDataSource.manager.save(EstateSize, seedEstateSizeData)
    await AppDataSource.manager.save(DistrictName, seedDistrictNameData)
  }
}

const SeedsImpl = new seedEssentialDataRepository();
export default SeedsImpl;
