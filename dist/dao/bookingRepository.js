"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRepository = void 0;
const DBConnectorData_1 = require("../DBConnectorData");
exports.bookingRepository = DBConnectorData_1.AppDataSource.getRepository(Event);
// import { HydratedDocument, Model } from "mongoose";
// import Booking, { BookingModel } from "../entity/bookingModel";
// import { MongoRepository } from "./MongoRepository";
// interface BookingRepositoryInterface<BookingModel> extends MongoRepository<BookingModel> {
//   findUserByEmail (email: string, returnPass: boolean) : Promise<HydratedDocument<BookingModel> | null>;
// }
// class BookingRepository<T extends BookingModel> extends MongoRepository<BookingModel> implements BookingRepositoryInterface<BookingModel> {
//   constructor(model: Model<BookingModel>) {
//     super(model);
//   }
//   async findUserByEmail(
//     email: string, returnPass = false
//   ): Promise<HydratedDocument<BookingModel> | null> {
//     let query = this.model.findOne({ email: email });
//     returnPass && (query = query.select("+password"));
//     const booking = await query;
//     return booking;
//   }
// }
// export const bookingDBHandler = new BookingRepository(Booking);
