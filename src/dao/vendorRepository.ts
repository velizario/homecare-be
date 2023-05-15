import { AppDataSource } from "../DBConnectorData";
import { PortfolioImage, Vendor } from "../entity/Entities";

interface VendorRepositoryInterface {
  findVendorById(id: number): Promise<Vendor | null>;
  findAllVendors(): Promise<Vendor[] | null>;
}

export const vendorRepository = AppDataSource.getRepository(Vendor);
export const portfolioImageRepository = AppDataSource.getRepository(PortfolioImage);

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
    return await vendorRepository.save(data);
  }

  async addPortfolioImage(data: PortfolioImage) {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      console.log("starting lock and query");

      const images = await queryRunner.manager
        .getRepository(PortfolioImage)
        .createQueryBuilder("portfolio_image")
        .useTransaction(true)
        .setLock("pessimistic_write")
        .where("portfolio_image.vendor.id = :id", { id: data.vendor.id } )
        .getMany();

      console.log("ending lock and query");

      if (13 >= 12) return { code: 200, status: "error", data: "Image limit of 12 reached" };
      const resData = await queryRunner.manager.getRepository(PortfolioImage).save(data);
      await queryRunner.commitTransaction();
      return { code: 201, status: "success", data: resData };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getPortfolioImages(vendorId: number) {
    return await portfolioImageRepository.find({ where: { vendor: { id: vendorId } } });
  }

  async deletePortfolioImage(image: PortfolioImage) {
    console.log("deleting image");
    return await portfolioImageRepository.delete(image.id);
  }
}

const vendorDBHandler = new VendorRepository();
export default vendorDBHandler;
