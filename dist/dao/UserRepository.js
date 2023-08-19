"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRepository = exports.userRepository = void 0;
const DBConnectorData_1 = require("../DBConnectorData");
const Entities_1 = require("../entity/Entities");
const appError_1 = __importDefault(require("../utils/appError"));
const validateObjToEntity_1 = __importDefault(require("../utils/validateObjToEntity"));
exports.userRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.User);
exports.clientRepository = DBConnectorData_1.AppDataSource.getRepository(Entities_1.Client);
class UserRepository {
    async findUserBy(searchArg) {
        return await exports.userRepository.findOne({
            where: searchArg,
            relations: ["vendor"],
        });
    }
    async findUserById(id) {
        const test = await exports.userRepository.findOne({
            where: { id: id },
            relations: { vendor: true, client: true },
        });
        return test;
    }
    async findUserByEmail(email) {
        return await exports.userRepository.findOne({
            where: { email: email },
            relations: { vendor: true, client: true },
        });
    }
    async findAllUsers() {
        return await exports.userRepository.find();
    }
    async findAllClients() {
        return await exports.clientRepository.find();
    }
    async addUser(data) {
        // assign data object to an instance of User and validate the data
        await (0, validateObjToEntity_1.default)(data, Entities_1.User);
        return await exports.userRepository.save(data);
    }
    async updateUser(id, data) {
        await (0, validateObjToEntity_1.default)(data, Entities_1.User);
        // .update does not work - https://github.com/typeorm/typeorm/issues/2821
        return await exports.userRepository.save(data);
    }
    async addVendor(id, vendorData) {
        await (0, validateObjToEntity_1.default)(vendorData, Entities_1.Vendor);
        // const test = await vendorRepository.findOneBy({userId: id})
        const userData = await this.findUserById(id);
        if (!userData)
            throw new appError_1.default("No such user in Database", 404);
        userData.vendor = vendorData;
        return await this.addUser(userData);
        // return await vendorRepository.save(vendorData)
    }
}
const userDBHandler = new UserRepository();
exports.default = userDBHandler;
// import { HydratedDocument, Model } from "mongoose";
// import User, { UserModel } from "../model/userModel";
// import { MongoRepository } from "./MongoRepository";
// interface UserRepositoryInterface<UserModel> extends MongoRepository<UserModel> {
//   findUserByEmail (email: string, returnPass: boolean) : Promise<HydratedDocument<UserModel> | null>;
// }
// class UserRepository<T extends UserModel> extends MongoRepository<UserModel> implements UserRepositoryInterface<UserModel> {
//   constructor(model: Model<UserModel>) {
//     super(model);
//   }
//   async findUserByEmail(
//     email: string, returnPass = false
//   ): Promise<HydratedDocument<UserModel> | null> {
//     let query = this.model.findOne({ email: email });
//     returnPass && (query = query.select("+password"));
//     const user = await query;
//     return user;
//   }
// }
// export const userDBHandler = new UserRepository(User);
