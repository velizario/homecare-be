import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/errorHandler";
import AppError from "../utils/appError";
import userDBHandler from "../dao/UserRepository";
import bcrypt from "bcryptjs";
import hydrateUserData from "../utils/hydrateUserData";
import { HydratedUser, UserUnion } from "../types/types";
import fileUpload from "express-fileupload";
import mime from "mime";
import { IMAGE_PATH } from "../utils/staticData";
import { User } from "../entity/Entities";
import { flattenUserData } from "./flattenUserData";

export const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // const user = await userDBHandler.findUserById(req.params.id);
  // if (!user) return next(new AppError("User does not exist", 404));
  // res.user = flattenUserData(user);
  // next();

  res.status(200).json({
    status: "success",
    data: res.user,
  });
});

export const getLoggedInUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // user is coming in req.user via authController, include guard clause because this function doesn't know
  if (!req.user) return next(new AppError("User does not exist", 404));
  const user = await userDBHandler.findUserById(req.user.id);
  if (!user) return next(new AppError("User does not exist exists", 401));
  res.user = flattenUserData(user);
  next();
});

export const imageUpload = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Log the files to the console
  console.log("uploading image");
  if (!req.files) return next(new AppError("no file!", 400));
  if (!res.user) return next(new AppError("User is not attached to response!", 500));

  const image = req.files.file as fileUpload.UploadedFile;

  if (!mime.getType(image.name)?.includes("image")) return next(new AppError("Not an image!", 500));

  // If does not have image mime type prevent from uploading
  // if (/^image/.test(image.mimetype)) return res.sendStatus(400);

  image.mv(IMAGE_PATH + "/" + image.name, async (err) => {
    if (err) {
      return next(new AppError(err, 500));
    }
    const userWithImageUpdated = await userDBHandler.updateUserImage(res.user!.id, image.name);
    if (!userWithImageUpdated) return next(new AppError("Could not upload image!", 500))
    res.status(200).json({ status: "success", data: userWithImageUpdated });
  });
});

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data: UserUnion = req.body;
  // Split user and client/vendor data.

  const hydratedUser: HydratedUser = hydrateUserData(data);
  const userFoundInDb = await userDBHandler.findUserByEmail(hydratedUser.email);
  if (userFoundInDb) {
    return next(new AppError("User with such email already exists", 401));
  }
  // Hash the password with cost of 12
  hydratedUser.password = await bcrypt.hash(hydratedUser.password, 12);

  const newUser = await userDBHandler.addUser(hydratedUser);
  if (!newUser) return next(new AppError("Could not create the user!", 400));
  res.user = flattenUserData(newUser);
  next();
});

// TODO: Validate that update is coming either from admin or from the user itself by confirming token is for the same user as the updates
export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const hydratedUser = hydrateUserData(req.body);
  console.log(hydratedUser);
  // if (req.user) hydratedUser.password = req.user?.password;
  const updatedUser = await userDBHandler.updateUser(req.params.id, hydratedUser as User);
  res.status(201).json({
    status: "success",
    data: flattenUserData(updatedUser),
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
