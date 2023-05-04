import { AppDataSource } from "../DBConnectorData";
import { DistrictName, EstateSize, OrderStatus, ServiceType, ClientDayChoice, VisitFrequency, ClientHourChoice } from "../entity/Entities";


class EssentialsRepository {
  async findAllServiceTypes() {
    return await AppDataSource.manager.find(ServiceType)
  }
  async findAllVisitFrequencies() {
    return await AppDataSource.manager.find(VisitFrequency)
  }
  async findAllClientDayChoices() {
    return await AppDataSource.manager.find(ClientDayChoice)
  }
  async findOrderstatuses() {
    return await AppDataSource.manager.find(OrderStatus)
  }
  async findAllClientHourChoices() {
    return await AppDataSource.manager.find(ClientHourChoice)
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
