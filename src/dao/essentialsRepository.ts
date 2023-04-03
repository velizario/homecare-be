import { AppDataSource } from "../DBConnectorData";
import { SeedDistrictName, SeedEstateSize, SeedOrderStatus, SeedServiceType, SeedVisitDay, SeedVisitFrequency, SeedVisitHour } from "../entity/Entities";

export const SeedServiceTypeRepository = AppDataSource.getRepository(SeedServiceType);

class EssentialsRepository {
  async findAllServiceTypes() {
    return await AppDataSource.manager.find(SeedServiceType)
  }
  async findAllVisitFrequencies() {
    return await AppDataSource.manager.find(SeedVisitFrequency)
  }
  async findAllVisitDays() {
    return await AppDataSource.manager.find(SeedVisitDay)
  }
  async findAllOrderStatuses() {
    return await AppDataSource.manager.find(SeedOrderStatus)
  }
  async findAllVisitHours() {
    return await AppDataSource.manager.find(SeedVisitHour)
  }
  async findAllEstateSizes() {
    return await AppDataSource.manager.find(SeedEstateSize)
  }
  async findAllDistrictNames() {
    return await AppDataSource.manager.find(SeedDistrictName)
  }



}

const EssentialsDBHandler = new EssentialsRepository();
export default EssentialsDBHandler;
