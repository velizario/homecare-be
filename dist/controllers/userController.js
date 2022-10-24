import catchAsync from "../utils/errorHandler";
import { userDBHandler } from "../dao/UserRepository";
import { createSendToken } from "./authController";
export const getUser = catchAsync(async (req, res) => {
    const user = await userDBHandler.findById(req.params.id);
    res.status(201).json({
        status: "success",
        data: {
            user,
        },
    });
});
export const signup = catchAsync(async (req, res, next) => {
    // do not allow creating admins via the API
    // const userData = { ...req.body, roles: [0] } as UserModel;
    const userData = req.body;
    // create the user
    const newUser = await userDBHandler.add(userData);
    createSendToken(newUser, 201, res);
});
export const createUser = catchAsync(async (req, res) => {
    const newUser = await userDBHandler.add(req.body);
    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});
export const getAllUsers = catchAsync(async (req, res) => {
    const users = await userDBHandler.findByQuery(req.query);
    res.status(201).json({
        status: "success",
        data: {
            users,
        },
    });
});
export const updateUser = catchAsync(async (req, res) => {
    const updatedUser = await userDBHandler.edit(req.params.id, req.body);
    res.status(201).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});
export const deleteUser = catchAsync(async (req, res) => {
    await userDBHandler.deleteById(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
// export const featured = (req: Request, res: Response, next: NextFunction) => {
//   // Create featured products middleware which updates the query and can be called via router e.g. http://localhost/featuredProducts
//   req.query = { email: "velliboy@yahoo.com" };
//   next();
// };
