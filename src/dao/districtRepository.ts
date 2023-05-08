import { AppDataSource } from "../DBConnectorData";
import { DistrictName } from "../entity/Entities";

export const districtRepository = AppDataSource.getRepository(DistrictName);

interface DistrictRepositoryInterface {
  findUserById(id: number): Promise<DistrictName | null>;
  findAllUsers(): Promise<DistrictName[] | null>;
}

class DistrictRepository implements DistrictRepositoryInterface {
  async findUserById(id: number) {
    return await districtRepository.findOneBy({ id: id });
  }

  async findAllUsers(): Promise<DistrictName[] | null> {
    return await districtRepository.find();
  }
}

const districtDBHandler = new DistrictRepository();
export default districtDBHandler;
