"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateUser = exports.signup = exports.imageProfileUpdate = exports.getLoggedInUser = exports.getUserAnonymously = exports.getUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserRepository_1 = __importDefault(require("../dao/UserRepository"));
const Entities_1 = require("../entity/Entities");
const appError_1 = __importDefault(require("../utils/appError"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const hydrateUserData_1 = __importDefault(require("../utils/hydrateUserData"));
const validateObjToEntity_1 = __importDefault(require("../utils/validateObjToEntity"));
exports.getUser = (0, errorHandler_1.default)(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: res.user,
    });
});
exports.getUserAnonymously = (0, errorHandler_1.default)(async (req, res, next) => {
    const userId = Number(req.params.id);
    const resData = await UserRepository_1.default.findUserById(userId);
    res.status(200).json({
        status: "success",
        data: resData,
    });
});
exports.getLoggedInUser = (0, errorHandler_1.default)(async (req, res, next) => {
    // user is coming in req.user via authController, include guard clause because this function doesn't know
    if (!req.user)
        return next(new appError_1.default("User does not exist", 404));
    const user = await UserRepository_1.default.findUserById(req.user.id);
    if (!user)
        return next(new appError_1.default("User does not exist exists", 401));
    res.user = user;
    next();
});
exports.imageProfileUpdate = (0, errorHandler_1.default)(async (req, res, next) => {
    if (!req.files)
        return next(new appError_1.default("no file!", 400));
    if (!res.user)
        return next(new appError_1.default("User is not attached to response!", 500));
    const userId = res.user.id;
    const image = req.files.uploadCandidate;
    const user = await UserRepository_1.default.findUserById(userId);
    if (!user)
        throw new appError_1.default("No such user in Database", 404);
    user.imageUrl = image.name;
    const imageUpdated = await UserRepository_1.default.updateUser(userId, user);
    if (!imageUpdated)
        return next(new appError_1.default("Could not upload image!", 500));
    res.status(200).json({ status: "success", data: imageUpdated });
});
exports.signup = (0, errorHandler_1.default)(async (req, res, next) => {
    const data = req.body;
    // Split user and client/vendor data.
    const hydratedUser = (0, hydrateUserData_1.default)(data);
    if (!hydratedUser.password)
        return next(new appError_1.default("Application error. Password is not attached.", 500));
    const userFoundInDb = await UserRepository_1.default.findUserByEmail(hydratedUser.email);
    if (userFoundInDb) {
        return next(new appError_1.default("User with such email already exists", 401));
    }
    // Hash the password with cost of 12
    hydratedUser.password = await bcryptjs_1.default.hash(hydratedUser.password, 12);
    const newUser = await UserRepository_1.default.addUser(hydratedUser);
    if (!newUser)
        return next(new appError_1.default("Could not create the user!", 400));
    res.user = newUser;
    next();
});
// TODO: Validate that update is coming either from admin or from the user itself by confirming token is for the same user as the updates
exports.updateUser = (0, errorHandler_1.default)(async (req, res, next) => {
    if (!res.user)
        return next(new appError_1.default("User not attached", 500));
    const userToUpdate = Object.assign(res.user, req.body);
    const hydratedUser = (0, hydrateUserData_1.default)(userToUpdate);
    console.log(hydratedUser);
    const updatedUser = await UserRepository_1.default.updateUser(res.user.id, hydratedUser);
    if (!updatedUser)
        return next(new appError_1.default("Could not update the user!", 400));
    res.status(201).json({
        status: "success",
        data: updatedUser,
    });
});
exports.changePassword = (0, errorHandler_1.default)(async (req, res, next) => {
    const changeAttributes = req.body;
    const user = res.user;
    if (!user)
        return next(new appError_1.default("User is not attached to response!", 500));
    user.email = changeAttributes.email;
    // Hash the password with cost of 12
    user.password = await bcryptjs_1.default.hash(changeAttributes.password, 12);
    (0, validateObjToEntity_1.default)(user, Entities_1.User);
    const userFoundInDb = await UserRepository_1.default.findUserByEmail(user.email);
    if (userFoundInDb && userFoundInDb.id != user.id) {
        return next(new appError_1.default("User with such email already exists", 401));
    }
    const updatedUser = await UserRepository_1.default.updateUser(user.id, user);
    if (!updatedUser)
        return next(new appError_1.default("Could not update the user!", 400));
    res.status(201).json({
        status: "success",
        data: updatedUser,
    });
});
// Do I need to add vendor?
// export const addVendor = catchAsync(async (req: Request, res: Response) => {
//     const userWithVendor = await userDBHandler.addVendor(req.params.id, req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         user: userWithVendor,
//       },
//     });
// })
// // Do I need to create user except when signing-up?
// export const createUser = catchAsync(async (req: Request, res: Response) => {
//   const newUser = await userDBHandler.add(req.body);
//   res.status(201).json({
//     status: "success",
//     data: {
//       user: newUser,
//     },
//   });
// });
// // Do I need to get all users?
// export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
//   const users = await userDBHandler.findByQuery(req.query as Record <string, string>);
//   res.status(201).json({
//     status: "success",
//     data: {
//       users,
//     },
//   });
// });
// // DO I need to delete user?
// export const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   await userDBHandler.deleteById(req.params.id);
//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// });
// export const featured = (req: Request, res: Response, next: NextFunction) => {
//   // Create featured products middleware which updates the query and can be called via router e.g. http://localhost/featuredProducts
//   req.query = { email: "velliboy@yahoo.com" };
//   next();
// };
