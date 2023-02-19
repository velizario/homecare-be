import { AppDataSource } from "../DBConnectorData";
import { District } from "../entity/Entities";

export const districtRepository = AppDataSource.getRepository(District);

interface DistrictRepositoryInterface {
  findById(id: string): Promise<District | null>;
  findAll(): Promise<District[] | null>;
}

class DistrictRepository implements DistrictRepositoryInterface {
  async findById(id: string) {
    return await districtRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<District[] | null> {
    return await districtRepository.find();
  }
}

const districtDBHandler = new DistrictRepository();
export default districtDBHandler;
