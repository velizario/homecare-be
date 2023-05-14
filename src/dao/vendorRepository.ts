import { AppDataSource } from "../DBConnectorData";
import { Vendor } from "../entity/Entities";

interface VendorRepositoryInterface {
  findVendorById(id: number): Promise<Vendor | null>;
  findAllVendors(): Promise<Vendor[] | null>;
}

export const vendorRepository = AppDataSource.getRepository(Vendor);

class VendorRepository implements VendorRepositoryInterface {
  async findVendorById(id: number): Promise<Vendor | null> {
    return await vendorRepository.findOne({ where: { id: id }, relations: ["user"] });
  }

  async findAllVendors(): Promise<Vendor[] | null> {
    return await vendorRepository.find({ relations: ["user"] });
  }

  async findVendorBy(searchArg: Record<string, string | number>) {
    return await vendorRepository.findOne({
      where: searchArg,
      relations: ["user"],
    });
  }

  async updateVendor(data: Vendor) {
    return await vendorRepository.save(data)
  }


}

const vendorDBHandler = new VendorRepository();
export default vendorDBHandler;
