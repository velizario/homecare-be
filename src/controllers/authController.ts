import { Request, Response, NextFunction } from "express";
import { User } from "../entity/Entities";
import catchAsync from "../utils/errorHandler";
import userDBHandler from "../dao/UserRepository";
import AppError from "../utils/appError";
import validatePassword from "../utils/validatePassword";
import jwt, { JwtPayload } from "jsonwebtoken";

const signToken = (id: number) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const sendToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!res.user) return next(new AppError("Internal error. User not created", 404))

  const token = signToken(res.user.id);

  // send cookie
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRATION) * 24 * 60 * 60 * 1000),
    // secure: true,   // Only over HTTPS
    httpOnly: true, //cannot be accessed or modified by the browser

    // domain: "localhost",
    // sameSite: "lax",
  });


  res.status(200).json({
    status: "success",
    token,
    data: res.user,
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as User;
  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  console.log(email)

  // Check if the user exists and password is correct
  const user = await userDBHandler.findUserByEmail(email);
  console.log(user)
  if (!user) return next(new AppError("Incorrect email or password", 401));
  console.log("test")
  if (!(await validatePassword(password, user.password))) return next(new AppError("Incorrect email or password", 401));

  // Send the token to the user
  // res.status(200).json({
  //   status: "success",
  //   data: res.user,
  // });
  res.user = user;
  next();
});

// Validates token and allows further routing
export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction, email?: string) => {
  console.log("protect");
  // 1) Get token and
  // Token is sent by the user in the header in format { Authorization : Bearer token }
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; //gets the second part of the string (after Bearer)
  }
  
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  
  // Asynchronously - typescript returns error
  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //NOTE: synchronously - blocks the thread.
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  
  // 3) Check if user still exists (might have been deleted)
  const freshUser = await userDBHandler.findUserById(decoded.id.toString());
  if (!freshUser) {
    return next(new AppError("The user does not longer exist", 401));
  }
  
  // 4) check if user changed password after JWT was issued NOTE: not implemented.
  
  // NOTE: How to keep info on the logged in user? response might be best. Right now I'm also adding to the req.user - see if that is security breach, as user can add it too
  res.user = freshUser;
  next();
});

// Restricts to roles
// export const restrictTo = (...roles: Role[]) =>
//   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user || !req.user.roles.some((role) => roles.includes(role))) {
//       return next(
//         new AppError("You do not have permission to perform this action", 403)
//       );
//     }
//     next();
//   });
