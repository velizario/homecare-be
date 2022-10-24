import mongoose, { HydratedDocument, Types } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import AppError from "../utils/appError";
import { userDBHandler } from "../dao/UserRepository";
import getDistricts from "../utils/getDistricts";
import {cleaningCategories} from "../utils/staticData"

// Create UserModel interface
// NOTE: Does it needs to extend identifiable?
// export interface IUser extends Indentifiable {

export interface UserModel {
  _id: Types.ObjectId;
  userType: "client" | "provider";
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  // memberSince: Date;
  about: string;
  isProvider: boolean;
  website: string;
  districts?: string[];
  pricePerHour: [number, number];
  cleaningCategories: string[];
  availablity: {
    adHoc: boolean;
    weekly: boolean;
    biWeekly: boolean;
  };
  availabilityHours: {
    start: number;
    end: number;
  };
}


// Create DB Schema
export const userSchema = new mongoose.Schema<UserModel>({
  userType: {
    type: String,
    enum: {values: ["client", "provider"], message: "Not a valid type ('client' or 'provider')"},
    required: [true, "Missing user type"],
  },
  firstName: {
    type: String,
    required: [true, "Missing Document entry"],
    trim: true,
    maxlength: [40, "A name must have less or equal to 40 characters"],
    minlength: [2, "A name must have more or equal to 2 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Missing Document entry"],
    trim: true,
    maxlength: [40, "A lastName must have less or equal to 40 characters"],
    minlength: [2, "A lastname must have more or equal to 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Missing Document entry"],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Email is not valid"],
  },
  password: {
    type: String,
    required: [true, "Missing password"],
    minlength: [6, "Password length should be at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Missing password"],
    validate: {
      // This only works on 'create' and 'save'!! It will not work on update!
      validator: function (this: UserModel, el: string) {
        return el === this.password;
      },
      message: "password are not the same!",
    },
    select: false,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
  },
  website: {
    type: String,
    validate: [validator.isFQDN, "URL is not a valid FQDN"],
  },
  districts: {
    type: [String],
    default: undefined
  },
  pricePerHour : {
    type: [Number, Number],
    default: undefined
  },
  cleaningCategories : {
    type: [String],
    enum: {values: cleaningCategories, message: "Not a valid cleaning category"},
    default: undefined

  },
  availablity: {
    adHoc: Boolean,
    weekly: Boolean,
    biWeekly: Boolean,
  },
  availabilityHours: {
    type:  {
    start: Number,
    end: Number,
    }
  },
},
{ timestamps: true }
);


// Pre save manipulations in the Schema
userSchema.pre(
  "save",
  async function (this: HydratedDocument<UserModel>, next) {
    // Check if user exists
    const userFoundInDb = await userDBHandler.findByEmail(this.email);
    if (userFoundInDb) {
      return next(new AppError("User with such email already exists", 401));
    }
    // Encode password if it was modified. Hash password and remove password confirm field
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password!, 12);
    this.passwordConfirm = undefined;

    // Validate districts
    const districts = await getDistricts();
    if (this.districts) {
      if (!this.districts?.every(district => districts.includes(district))) {
        return next(new AppError("Incorrect values for districts!", 401));
      };
    }

    next();
  }
);


// Create DB Model
const User = mongoose.model(
  "Users", //this is the collection name. It is lowercase in MongoDB
  userSchema
);

export default User;