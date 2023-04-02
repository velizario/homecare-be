import { AppDataSource } from "../DBConnectorData";
import { SeedServiceType } from "../entity/Entities";

export const SeedServiceTypeRepository = AppDataSource.getRepository(SeedServiceType);

class EssentialsRepository {
  async findAllServices() {
    return await SeedServiceTypeRepository.find();
  }
}

const EssentialsDBHandler = new EssentialsRepository();
export default EssentialsDBHandler;
