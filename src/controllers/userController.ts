import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/errorHandler";
import { userDBHandler } from "../dao/UserRepository";
import { UserModel } from "../model/UserModel"
import { createSendToken } from "./authController";
import AppError from "../utils/appError";

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userDBHandler.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData: UserModel = req.body;
    const newUser = await userDBHandler.add(userData);
    if (newUser) {
      createSendToken(newUser, 201, res);
    }
    else {
      next(new AppError("Could not create the user!", 400))
    }
  }
);

// TODO: Validate that update is coming either from admin or from the user itself by confirming token is for the same user as the updates
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await userDBHandler.edit(req.params.id, req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

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
