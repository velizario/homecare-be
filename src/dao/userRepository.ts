import { HydratedDocument, Model } from "mongoose";
import User, { UserModel } from "../model/userModel";
import { MongoRepository } from "./MongoRepository";

interface UserRepositoryInterface<UserModel> extends MongoRepository<UserModel> {
  findByEmail (email: string, returnPass: boolean) : Promise<HydratedDocument<UserModel> | null>;
}

class UserRepository<T extends UserModel> extends MongoRepository<UserModel> implements UserRepositoryInterface<UserModel> {
  constructor(model: Model<UserModel>) {
    super(model);
  }

  async findByEmail(
    email: string, returnPass = false
  ): Promise<HydratedDocument<UserModel> | null> {
    let query = this.model.findOne({ email: email });
    returnPass && (query = query.select("+password"));
    const user = await query;
    return user;
  }

}

export const userDBHandler = new UserRepository(User);
