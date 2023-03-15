import { AppDataSource } from "../DBConnectorData";
import { Vendor } from "../entity/Entities";

interface VendorRepositoryInterface {
  findVendorById(id: string): Promise<Vendor | null>;
  findAllVendors(): Promise<Vendor[] | null>;
}

export const vendorRepository = AppDataSource.getRepository(Vendor);

class VendorRepository implements VendorRepositoryInterface {
  async findVendorById(id: string): Promise<Vendor | null> {
    return await vendorRepository.findOneBy({ id: id });
  }

  async findAllVendors(): Promise<Vendor[] | null> {
    return await vendorRepository.find();
  }
}

const vendorDBHandler = new VendorRepository();
export default vendorDBHandler;
