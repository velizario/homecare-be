import { validate } from "class-validator";
import { UpdateResult } from "typeorm";
import { AppDataSource } from "../DBConnectorData";
import { Client, User, Vendor } from "../entity/Entities";
import { HydratedUser } from "../types/types";
import AppError from "../utils/appError";
import validateObjToEntity from "../utils/validateObjToEntity";

export const userRepository = AppDataSource.getRepository(User);
export const vendorRepository = AppDataSource.getRepository(Vendor);
export const clientRepository = AppDataSource.getRepository(Client);

interface UserRepositoryInterface {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
findAllUsers(): Promise<User[] | null>;
  findAllClients(): Promise<Client[] | null>;
  findAllVendors(): Promise<Vendor[] | null>;
  addUser(data: User): Promise<User | null>;
  // addVendor(id: string, vendorData: User): Promise<User | null>;
  update(id: string, data: User): Promise<UpdateResult>;
}

class UserRepository implements UserRepositoryInterface {
  async findUserById(id: string) {
    return await userRepository.findOneBy({ id: id });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await userRepository.findOneBy({ email: email });
  }

  async findAllUsers(): Promise<User[] | null> {
    return await userRepository.find();
  }

  async findAllClients(): Promise<Client[] | null> {
    return await clientRepository.find();
  }

  async findAllVendors(): Promise<Vendor[] | null> {
    return await vendorRepository.find();
  }

  async addUser(data: HydratedUser): Promise<User | null> {
    // assign data object to an instance of User and validate the data
    await validateObjToEntity<HydratedUser>(data, User);
    return await userRepository.save(data);
  }

  async update(id: string, data: User) {
    return await userRepository.update(id, data);
  }

  async addVendor(id: string, vendorData: Vendor) {
    await validateObjToEntity<Vendor>(vendorData, Vendor);
    // const test = await vendorRepository.findOneBy({userId: id})
    const userData = await this.findUserById(id)
    if (!userData) throw new AppError("No such user in Database", 404)
    userData.vendor = vendorData;
    return await this.addUser(userData);
    // return await vendorRepository.save(vendorData)
  };

}

const userDBHandler = new UserRepository();
export default userDBHandler;

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
