"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioImageRepository = exports.vendorRepository = void 0;
const DBConnectorData_1 = require("../DBConnectorData");
const Entities_1 = require("../entity/Entities");
exports.vendorRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.Vendor);
exports.portfolioImageRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.PortfolioImage);
class VendorRepository {
    async findVendorById(id) {
        return await exports.vendorRepository.findOne({ where: { id: id }, relations: ["user"] });
    }
    async findAllVendors() {
        return await exports.vendorRepository.find({ relations: ["user"] });
    }
    async findVendors(searchArg) {
        // First query only joins pulling vendors by condition once and then once more to get all relations properly.
        const vendorsFound = await exports.vendorRepository.find({ where: searchArg });
        if (vendorsFound.length === 0)
            return [];
        const vendorIds = vendorsFound.map(vendor => ({ id: vendor.id }));
        return await exports.vendorRepository.find({ where: vendorIds, relations: ["user"] });
    }
    async updateVendor(data) {
        return await exports.vendorRepository.save(data);
    }
    async addPortfolioImage(data) {
        const queryRunner = DBConnectorData_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // await queryRunner.query("lock table portfolio_image IN ACCESS EXCLUSIVE MODE");
            const images = await queryRunner.manager
                .getRepository(Entities_1.PortfolioImage)
                .count({ where: { vendor: { id: data.vendor.id } } });
            // const images = await queryRunner.manager
            //   .getRepository(PortfolioImage)
            //   .createQueryBuilder("portfolio_image")
            //   .useTransaction(true)
            //   .setLock("pessimistic_write")
            //   .where({vendor: { id: data.vendor.id } })
            //   .getMany();
            // console.log("ending lock and query");
            if (images >= 12)
                return { code: 200, status: "error", data: "Image limit of 12 reached" };
            const resData = await queryRunner.manager.getRepository(Entities_1.PortfolioImage).save(data);
            await queryRunner.commitTransaction();
            return { code: 201, status: "success", data: resData };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async getPortfolioImages(vendorId) {
        return await exports.portfolioImageRepository.find({ where: { vendor: { id: vendorId } } });
    }
    async getPortfolioImage(imageId) {
        return await exports.portfolioImageRepository.findOneBy({ id: imageId });
    }
    async deletePortfolioImage(image) {
        console.log("deleting image");
        return await exports.portfolioImageRepository.delete(image.id);
    }
}
const vendorDBHandler = new VendorRepository();
exports.default = vendorDBHandler;
