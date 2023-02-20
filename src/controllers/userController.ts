import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/errorHandler";
import { createSendToken } from "./authController";
import AppError from "../utils/appError";
import userDBHandler from "../dao/UserRepository";
import bcrypt from "bcryptjs";

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
    console.log("test");
    const userData = req.body;
    const userFoundInDb = await userDBHandler.findByEmail(userData.email);
    if (userFoundInDb) {
      return next(new AppError("User with such email already exists", 401));
    }
    // Hash the password with cost of 12
    userData.password = await bcrypt.hash(userData.password!, 12);
    // Delete the password confirm field
    userData.passwordConfirm = undefined;

    const newUser = await userDBHandler.addUser(userData);
    if (newUser) {
      createSendToken(newUser, 201, res);
    } else {
      next(new AppError("Could not create the user!", 400));
    }
  }
);

// TODO: Validate that update is coming either from admin or from the user itself by confirming token is for the same user as the updates
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await userDBHandler.update(req.params.id, req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const addVendor = catchAsync(async (req: Request, res: Response) => {
  console.log("!!!!!!!!!!!!!!!!adding vendor")
    const userWithVendor = await userDBHandler.addVendor(req.params.id, req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: userWithVendor,
      },
    });
})

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
