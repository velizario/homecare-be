import { AppDataSource } from "../../DBConnectorData";
import { DistrictName, EstateSize, OrderStatus, ServiceType, VisitDay, VisitFrequency, VisitHour, User } from "../../entity/Entities";
import { seedDistrictNameData, seedEstateSizeData, seedOrderStatusData, seedServiceTypeData, seedVisitDayData, seedVisitFrequencyData, seedVisitHourData } from "../../utils/staticData";

// export const SeedServiceTypeRepository = AppDataSource.getRepository(SeedServiceType);
// export const SeedVisitFrequencyRepository = AppDataSource.getRepository(SeedVisitFrequency);
// export const SeedVisitDayRepository = AppDataSource.getRepository(SeedVisitDay);
// export const SeedOrderStatusRepository = AppDataSource.getRepository(SeedOrderStatus);
// export const SeedVisitHourRepository = AppDataSource.getRepository(SeedVisitHour);
// export const SeedEstateSizeRepository = AppDataSource.getRepository(SeedEstateSize);



class seedEssentialDataRepository {
  async updateAllSeeds() {
    // await SeedServiceTypeRepository.save(seedServiceTypeData);
    await AppDataSource.manager.save(ServiceType, seedServiceTypeData)
    await AppDataSource.manager.save(VisitFrequency, seedVisitFrequencyData)
    await AppDataSource.manager.save(VisitDay, seedVisitDayData)
    await AppDataSource.manager.save(OrderStatus, seedOrderStatusData)
    await AppDataSource.manager.save(VisitHour, seedVisitHourData)
    await AppDataSource.manager.save(EstateSize, seedEstateSizeData)
    await AppDataSource.manager.save(DistrictName, seedDistrictNameData)
  }
}

const SeedsImpl = new seedEssentialDataRepository();
export default SeedsImpl;
