"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.login = exports.sendToken = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const UserRepository_1 = __importDefault(require("../dao/UserRepository"));
const appError_1 = __importDefault(require("../utils/appError"));
const validatePassword_1 = __importDefault(require("../utils/validatePassword"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
exports.sendToken = (0, errorHandler_1.default)(async (req, res, next) => {
    if (!res.user)
        return next(new appError_1.default("Internal error. User not created", 404));
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
exports.login = (0, errorHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    // Check if email and password exist
    if (!email || !password) {
        return next(new appError_1.default("Please provide email and password!", 400));
    }
    // Check if the user exists and password is correct
    const user = await UserRepository_1.default.findUserByEmail(email);
    if (!user)
        return next(new appError_1.default("Incorrect email or password", 401));
    if (!(await (0, validatePassword_1.default)(password, user.password)))
        return next(new appError_1.default("Incorrect email or password", 401));
    res.user = user;
    // Send the token to the user
    // res.status(200).json({
    //   status: "success",
    //   data: res.user,
    // });
    next();
});
// Validates token and allows further routing
exports.protect = (0, errorHandler_1.default)(async (req, res, next, email) => {
    console.log("protect");
    // 1) Get token and
    // Token is sent by the user in the header in format { Authorization : Bearer token }
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; //gets the second part of the string (after Bearer)
    }
    if (!token) {
        return next(new appError_1.default("You are not logged in", 401));
    }
    // Asynchronously - typescript returns error
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //NOTE: synchronously - blocks the thread.
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    // 3) Check if user still exists (might have been deleted)
    const freshUser = await UserRepository_1.default.findUserById(decoded.id.toString());
    if (!freshUser) {
        return next(new appError_1.default("The user does not longer exist", 401));
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
