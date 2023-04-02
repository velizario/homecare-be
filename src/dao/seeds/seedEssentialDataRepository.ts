import { AppDataSource } from "../../DBConnectorData";
import { ServiceData, User } from "../../entity/Entities";
import { servicesSeedData } from "../../utils/staticData";

export const serviceDataRepository = AppDataSource.getRepository(ServiceData);
export const userRepository = AppDataSource.getRepository(User);


class seedEssentialDataRepository {
  async updateServiceData() {
    return await serviceDataRepository.save(servicesSeedData);
  }
}

const SeedsImpl = new seedEssentialDataRepository();
export default SeedsImpl;
