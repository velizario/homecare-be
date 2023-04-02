import { AppDataSource } from "../../DBConnectorData";
import { SeedDistrictName, SeedEstateSize, SeedOrderStatus, SeedServiceType, SeedVisitDay, SeedVisitFrequency, SeedVisitHour, User } from "../../entity/Entities";
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
    await AppDataSource.manager.save(SeedServiceType, seedServiceTypeData)
    await AppDataSource.manager.save(SeedVisitFrequency, seedVisitFrequencyData)
    await AppDataSource.manager.save(SeedVisitDay, seedVisitDayData)
    await AppDataSource.manager.save(SeedOrderStatus, seedOrderStatusData)
    await AppDataSource.manager.save(SeedVisitHour, seedVisitHourData)
    await AppDataSource.manager.save(SeedEstateSize, seedEstateSizeData)
    await AppDataSource.manager.save(SeedDistrictName, seedDistrictNameData)
  }
}

const SeedsImpl = new seedEssentialDataRepository();
export default SeedsImpl;
