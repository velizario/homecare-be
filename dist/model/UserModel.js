import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import AppError from "../utils/appError";
import { userDBHandler } from "../dao/UserRepository";
// Create DB Schema
export const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: { values: ["client", "provider"], message: "Not a valid type ('client' or 'provider')" },
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
            validator: function (el) {
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
    pricePerHour: {
        type: [Number, Number],
        default: undefined
    },
    cleaningCategories: {
        type: [String],
        default: undefined
    },
    availablity: {
        adHoc: Boolean,
        weekly: Boolean,
        biWeekly: Boolean,
    },
    availabilityHours: {
        type: {
            start: Number,
            end: Number,
        }
    },
}, { timestamps: true });
// encode password before saving to database
userSchema.pre("save", async function (next) {
    const userFoundInDb = await userDBHandler.findByEmail(this.email);
    if (userFoundInDb) {
        return next(new AppError("User with such email already exists", 401));
    }
    //Only run this funtion if password was modified
    if (!this.isModified("password"))
        return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete the password confirm field
    this.passwordConfirm = undefined;
    next();
});
// Create DB Model
const User = mongoose.model("Users", //this is the collection name. It is lowercase in MongoDB
userSchema);
export default User;
