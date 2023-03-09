import { AppDataSource } from "../DBConnectorData";
import { District } from "../entity/Entities";

export const districtRepository = AppDataSource.getRepository(District);

interface DistrictRepositoryInterface {
  findUserById(id: string): Promise<District | null>;
  findAllUsers(): Promise<District[] | null>;
}

class DistrictRepository implements DistrictRepositoryInterface {
  async findUserById(id: string) {
    return await districtRepository.findOneBy({ id: id });
  }

  async findAllUsers(): Promise<District[] | null> {
    return await districtRepository.find();
  }
}

const districtDBHandler = new DistrictRepository();
export default districtDBHandler;
