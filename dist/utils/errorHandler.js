import AppError from "./appError";
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            if (err.message === "TokenExpiredError")
                return next(new AppError("Token expired!", 401));
            next(err);
        });
    };
};
export default catchAsync;
