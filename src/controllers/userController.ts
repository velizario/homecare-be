// signup user
// Update user
// list vendors
// show vendor details
// show client details

import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/errorHandler";
import { createSendToken } from "./authController";
import AppError from "../utils/appError";
import userDBHandler from "../dao/UserRepository";
import bcrypt from "bcryptjs";
import hydrateUserData from "../utils/hydrateUserData";
import { HydratedUser, UserUnion } from "../types/types";
import fileUpload from "express-fileupload";
import mime from "mime";
import { IMAGE_PATH } from "../utils/staticData";


export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userDBHandler.findUserById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getLoggedInUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError("User with such email already exists", 401));
  const user = await userDBHandler.findUserById(req.user.id);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});


export const imageUpload = (req: Request, res: Response, next: NextFunction) => {
  // Log the files to the console
  if (!req.files) {
    console.log("no file!");
    return res.sendStatus(400);
  }

  const image = req.files.file as fileUpload.UploadedFile;

  if (!mime.getType(image.name)?.includes("image"))
    return next(new AppError("Not an image!", 500));

  // If does not have image mime type prevent from uploading
  // if (/^image/.test(image.mimetype)) return res.sendStatus(400);

  image.mv(IMAGE_PATH + "/" + image.name, (err) => {
    if (err) {
      return next(new AppError(err, 500));
    }
    userDBHandler.updateUserImage(req.user!.id, image.name);
    return res.status(200).json({ status: "uploaded" });
  });
}

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data: UserUnion = req.body;
    // Split user and client/vendor data.

    const HydratedUser: HydratedUser = hydrateUserData(data);
    console.log(HydratedUser);
    const userFoundInDb = await userDBHandler.findUserByEmail(
      HydratedUser.email
    );
    if (userFoundInDb) {
      return next(new AppError("User with such email already exists", 401));
    }
    // Hash the password with cost of 12
    HydratedUser.password = await bcrypt.hash(HydratedUser.password, 12);

    const newUser = await userDBHandler.addUser(HydratedUser);
    if (newUser) {
      createSendToken(newUser, 201, res);
    } else {
      next(new AppError("Could not create the user!", 400));
    }
  }
);

// TODO: Validate that update is coming either from admin or from the user itself by confirming token is for the same user as the updates
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await userDBHandler.updateUser(req.params.id, req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Do I need to add vendor?
// export const addVendor = catchAsync(async (req: Request, res: Response) => {
//   console.log("!!!!!!!!!!!!!!!!adding vendor")
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
