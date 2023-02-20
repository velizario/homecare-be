import { validate } from "class-validator";
import { UpdateResult } from "typeorm";
import { AppDataSource } from "../DBConnectorData";
import { Client, User, Vendor } from "../entity/Entities";
import AppError from "../utils/appError";
import valdiateObjToEntity from "../utils/validateObjToEntity";

export const userRepository = AppDataSource.getRepository(User);
export const vendorRepository = AppDataSource.getRepository(Vendor);
export const clientRepository = AppDataSource.getRepository(Client);

interface UserRepositoryInterface {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findClients(): Promise<Client[] | null>;
  findVendors(): Promise<Vendor[] | null>;
  findAll(): Promise<User[] | null>;
  addUser(data: User): Promise<User | null>;
  // addVendor(id: string, vendorData: User): Promise<User | null>;
  update(id: string, data: User): Promise<UpdateResult> ;
}

class UserRepository implements UserRepositoryInterface {
  async findById(id: string) {
    return await userRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await userRepository.findOneBy({ email: email });
  }

  async findAll(): Promise<User[] | null> {
    return await userRepository.find();
  }

  async findClients(): Promise<Client[] | null> {
    return await clientRepository.find();
  }

  async findVendors(): Promise<Vendor[] | null> {
    return await vendorRepository.find();
  }

  async addUser(data: User): Promise<User | null> {
    // assign data object to an instance of User and validate the data
    await valdiateObjToEntity<User>(data, User);
    return await userRepository.save(data);
  }

  async update(id: string, data: User) {
    return await userRepository.update(id, data);
  }

  async addVendor(id: string, vendorData: Vendor) {
    await valdiateObjToEntity<Vendor>(vendorData, Vendor);
    // const test = await vendorRepository.findOneBy({userId: id})
    const userData = await this.findById(id)
    if (!userData) throw new AppError("No such user in Database", 404)
    userData.vendor = vendorData;
    console.log(userData)
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
//   findByEmail (email: string, returnPass: boolean) : Promise<HydratedDocument<UserModel> | null>;
// }

// class UserRepository<T extends UserModel> extends MongoRepository<UserModel> implements UserRepositoryInterface<UserModel> {
//   constructor(model: Model<UserModel>) {
//     super(model);
//   }

//   async findByEmail(
//     email: string, returnPass = false
//   ): Promise<HydratedDocument<UserModel> | null> {
//     let query = this.model.findOne({ email: email });
//     returnPass && (query = query.select("+password"));
//     const user = await query;
//     return user;
//   }

// }

// export const userDBHandler = new UserRepository(User);
