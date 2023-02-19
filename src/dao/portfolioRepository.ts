import { AppDataSource } from "../DBConnectorData";
import { Portfolio, Service } from "../entity/Entities";
import  { userRepository } from "./UserRepository";

export const portfolioRepository = AppDataSource.getRepository(Portfolio);

interface PortfolioRepositoryInterface {
  findByVendorId(vendorId: string): Promise<Portfolio | null>;
  findAll(): Promise<Portfolio[] | null>;
  addService(vendorId: string, service: Service): Promise<Portfolio | null>
  remove(vendorId: string, service: Portfolio): Promise<Portfolio | null>
}

class PortfolioRepository implements PortfolioRepositoryInterface {
  async findByVendorId(vendorId: string) {
    return await userRepository.findOneOrFail({select: {vendor: true}, where: {id: vendorId, isVendor: true}});
  }

  async findAll(): Promise<Portfolio[] | null> {
    return await portfolioRepository.find();
  }

  async add(vendorId: string, service: Portfolio) {
    const vendorPortfolio = await this.findByVendorId(vendorId)
    // vendorPortfolio?.push(service)
    vendor. = vendorId;
    return await portfolioRepository
  }
}

const portfolioDBHandler = new PortfolioRepository();
export default portfolioDBHandler;
