import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import userDBHandler from "../dao/UserRepository";
import { User } from "../entity/Entities";
import { FlattenedUser, HydratedUser } from "../types/types";
import AppError from "../utils/appError";
import catchAsync from "../utils/errorHandler";
import hydrateUserData from "../utils/hydrateUserData";
import validateObjToEntity from "../utils/validateObjToEntity";

export const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    data: res.user,
  });
});

export const getUserAnonymously = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.params.id);

  const resData = await userDBHandler.findUserById(userId);
  res.status(200).json({
    status: "success",
    data: resData,
  });
});

export const getLoggedInUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // user is coming in req.user via authController, include guard clause because this function doesn't know
  if (!req.user) return next(new AppError("User does not exist", 404));
  const user = await userDBHandler.findUserById(req.user.id);
  if (!user) return next(new AppError("User does not exist exists", 401));
  res.user = user;
  next();
});



export const imageProfileUpdate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) return next(new AppError("no file!", 400));
  if (!res.user) return next(new AppError("User is not attached to response!", 500));

  const userId = (res.user as User).id
  const image = req.files.uploadCandidate as fileUpload.UploadedFile;

  const user = await userDBHandler.findUserById(userId);
  if (!user) throw new AppError("No such user in Database", 404);
  user.imageUrl = image.name;

  const imageUpdated = await userDBHandler.updateUser(userId, user);
  if (!imageUpdated) return next(new AppError("Could not upload image!", 500));
  res.status(200).json({ status: "success", data: imageUpdated });
});

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data: FlattenedUser = req.body;
  // Split user and client/vendor data.

  const hydratedUser: HydratedUser = hydrateUserData(data);
  if (!hydratedUser.password) return next(new AppError("Application error. Password is not attached.", 500));

  const userFoundInDb = await userDBHandler.findUserByEmail(hydratedUser.email);
  if (userFoundInDb) {
    return next(new AppError("User with such email already exists", 401));
  }
  // Hash the password with cost of 12
  hydratedUser.password = await bcrypt.hash(hydratedUser.password, 12);

  const newUser = await userDBHandler.addUser(hydratedUser);
  if (!newUser) return next(new AppError("Could not create the user!", 400));
  res.user = newUser;
  next();
});

// TODO: Validate that update is coming either from admin or from the user itself by confirming token is for the same user as the updates
export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!res.user) return next(new AppError("User not attached", 500));

  const userToUpdate = Object.assign(res.user, req.body);
  const hydratedUser = hydrateUserData(userToUpdate as FlattenedUser);
  console.log(hydratedUser);
  const updatedUser = await userDBHandler.updateUser(res.user.id, hydratedUser as User);
  if (!updatedUser) return next(new AppError("Could not update the user!", 400));

  res.status(201).json({
    status: "success",
    data: updatedUser,
  });
});

export const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const changeAttributes = req.body as { email: string; password: string };
  const user = res.user;
  if (!user) return next(new AppError("User is not attached to response!", 500));

  user.email = changeAttributes.email;
  // Hash the password with cost of 12
  user.password = await bcrypt.hash(changeAttributes.password, 12);

  validateObjToEntity(user, User);

  const userFoundInDb = await userDBHandler.findUserByEmail(user.email);
  if (userFoundInDb && userFoundInDb.id != user.id) {
    return next(new AppError("User with such email already exists", 401));
  }

  const updatedUser = await userDBHandler.updateUser(user.id, user);
  if (!updatedUser) return next(new AppError("Could not update the user!", 400));

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
