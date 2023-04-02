import { AppDataSource } from "../DBConnectorData";
import { ServiceData } from "../entity/Entities";

export const serviceDataRepository = AppDataSource.getRepository(ServiceData);

class EssentialsRepository {
  async findAllServices() {
    return await serviceDataRepository.find();
  }
}

const EssentialsDBHandler = new EssentialsRepository();
export default EssentialsDBHandler;
