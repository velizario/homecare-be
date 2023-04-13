import { AppDataSource } from "../DBConnectorData";
import { DistrictName, EstateSize, OrderStatus, ServiceType, VisitDay, VisitFrequency, VisitHour } from "../entity/Entities";

export const SeedServiceTypeRepository = AppDataSource.getRepository(ServiceType);

class EssentialsRepository {
  async findAllServiceTypes() {
    return await AppDataSource.manager.find(ServiceType)
  }
  async findAllVisitFrequencies() {
    return await AppDataSource.manager.find(VisitFrequency)
  }
  async findAllVisitDays() {
    return await AppDataSource.manager.find(VisitDay)
  }
  async findOrderstatuses() {
    return await AppDataSource.manager.find(OrderStatus)
  }
  async findAllVisitHours() {
    return await AppDataSource.manager.find(VisitHour)
  }
  async findAllEstateSizes() {
    return await AppDataSource.manager.find(EstateSize)
  }
  async findAllDistrictNames() {
    return await AppDataSource.manager.find(DistrictName)
  }

}

const EssentialsDBHandler = new EssentialsRepository();
export default EssentialsDBHandler;
