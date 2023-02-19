// import {cleaningCategories} from "../utils/staticData"

// // Create BookingModel interface
// // NOTE: Does it needs to extend identifiable?
// // export interface IBooking extends Indentifiable {


// export interface BookingModel {
//   _id: string;
//   clientID: string;
//   providerID: string;
//   address: "string";
//   time: Date;
//   duration: number;
//   cleaningCategories: string[];
//   rating: number;
//   comment: string;
// }


// // Create DB Schema
// export const bookingSchema = new mongoose.Schema<BookingModel>({
//   clientID: {
//     type: string,
//     required: true,
//   },
//   providerID: {
//     type: Schema.Types.ObjectId,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   time: {
//     type: Date,
//     required: true,
//   },
//   duration:{
//     type: Number,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     default: undefined
//   },
//   comment: {
//     type: String,
//     default: undefined
//   },
//   cleaningCategories : {
//     type: [String],
//     enum: {values: cleaningCategories, message: "Not a valid cleaning category"},
//     default: undefined
//   },
// },
// { timestamps: true }
// );


// // Pre save manipulations in the Schema
// // None

// // Create DB Model
// const Booking = mongoose.model(
//   "Bookings", //this is the collection name. It is lowercase in MongoDB
//   bookingSchema
// );

// export default Booking;