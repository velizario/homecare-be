import mongoose, { HydratedDocument, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import AppError from "../utils/appError";
import { bookingDBHandler } from "../dao/BookingRepository";
import getDistricts from "../utils/getDistricts";
import {cleaningCategories} from "../utils/staticData"

// Create BookingModel interface
// NOTE: Does it needs to extend identifiable?
// export interface IBooking extends Indentifiable {


export interface BookingModel {
  _id: Types.ObjectId;
  clientID: Types.ObjectId;
  providerID: Types.ObjectId;
  address: "string";
  time: Date;
  duration: number;
  cleaningCategories: string[];
  rating: number;
  comment: string;
}


// Create DB Schema
export const bookingSchema = new mongoose.Schema<BookingModel>({
  clientID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  providerID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  duration:{
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: undefined
  },
  comment: {
    type: String,
    default: undefined
  },
  cleaningCategories : {
    type: [String],
    enum: {values: cleaningCategories, message: "Not a valid cleaning category"},
    default: undefined
  },
},
{ timestamps: true }
);


// Pre save manipulations in the Schema
// None

// Create DB Model
const Booking = mongoose.model(
  "Bookings", //this is the collection name. It is lowercase in MongoDB
  bookingSchema
);

export default Booking;