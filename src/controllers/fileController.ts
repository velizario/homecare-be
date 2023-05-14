import { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mime from "mime";
import AppError from "../utils/appError";
import catchAsync from "../utils/errorHandler";
import { IMAGE_PATH } from "../utils/staticData";

export const imageUploadFS = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next(new AppError("no file!", 400));
    if (!res.user) return next(new AppError("User is not attached to response!", 500));
  
    const image = req.files.uploadCandidate as fileUpload.UploadedFile;
    
    if (!mime.getType(image.name)?.includes("image")) return next(new AppError("Not an image!", 500));
    
    image.mv(IMAGE_PATH + "/" + image.name, async (err) => {
      if (err) return next(new AppError(err, 500));
      next()
    });
  });