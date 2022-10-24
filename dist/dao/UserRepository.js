import User from "../model/userModel";
import { MongoRepository } from "./MongoRepository";
class UserRepository extends MongoRepository {
    constructor(model) {
        super(model);
    }
    async findByEmail(email, returnPass = false) {
        let query = this.model.findOne({ email: email });
        returnPass && (query = query.select("+password"));
        const user = await query;
        return user;
    }
}
export const userDBHandler = new UserRepository(User);
