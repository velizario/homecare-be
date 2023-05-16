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

  async findVendors(searchArg: Record<string, string | number>) {
    return await vendorRepository.find({
      where: searchArg,
      relations: ["user"],
    });
  }

  async updateVendor(data: Vendor) {
    return await vendorRepository.save(data);
  }

  async addPortfolioImage(data: PortfolioImage) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // await queryRunner.query("lock table portfolio_image IN ACCESS EXCLUSIVE MODE");
      const images = await queryRunner.manager
        .getRepository(PortfolioImage)
        .count({ where: { vendor: { id: data.vendor.id } } });

      // const images = await queryRunner.manager
      //   .getRepository(PortfolioImage)
      //   .createQueryBuilder("portfolio_image")
      //   .useTransaction(true)
      //   .setLock("pessimistic_write")
      //   .where({vendor: { id: data.vendor.id } })
      //   .getMany();

      // console.log("ending lock and query");

      if (images >= 12) return { code: 200, status: "error", data: "Image limit of 12 reached" };
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

  async getPortfolioImage(imageId: number) {
    return await portfolioImageRepository.findOneBy({ id: imageId });
  }

  async deletePortfolioImage(image: PortfolioImage) {
    console.log("deleting image");
    return await portfolioImageRepository.delete(image.id);
  }
}

const vendorDBHandler = new VendorRepository();
export default vendorDBHandler;
