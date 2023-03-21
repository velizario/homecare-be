import { AppDataSource } from "../DBConnectorData";
import { Portfolio } from "../entity/Entities";

export const portfolioRepository = AppDataSource.getRepository(Portfolio);

interface PortfolioRepositoryInterface {
  // findByVendorId(vendorId: string): Promise<Portfolio | null>;
  findAllUsers(): Promise<Portfolio[] | null>;
  // addService(vendorId: string, service: Service): Promise<Portfolio | null>
  // remove(vendorId: string, service: Portfolio): Promise<Portfolio | null>
}

class PortfolioRepository implements PortfolioRepositoryInterface {
  // async findByVendorId(vendorId: string) {
  //   const vendorData = await vendorRepository.find({relations: {portfolio: true}, where: {id: vendorId}});
    
  // }

  async findAllUsers(): Promise<Portfolio[] | null> {
    return await portfolioRepository.find();
  }

  // addService(vendorId: string, service: Service): {
  //   const vendorPortfolio = await this.findByVendorId(vendorId)
  //   // vendorPortfolio?.push(service)
  //   vendor. = vendorId;
  //   return await portfolioRepository
  // }
}

const portfolioDBHandler = new PortfolioRepository();
export default portfolioDBHandler;
