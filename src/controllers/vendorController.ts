import { Request, Response, NextFunction } from "express";
import vendorDBHandler from "../dao/vendorRepository";
import catchAsync from "../utils/errorHandler";
import AppError from "../utils/appError";
import userDBHandler from "../dao/UserRepository";
import { flattenUserData } from "./flattenUserData";

export const getVendor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendor = await userDBHandler.findUserById(req.params.id);
    if (!vendor) return next(new AppError("Vendor does not exist exists", 401));
    console.log(vendor)
    // Proper response handling!!!
    res.status(201).json({
      status: "success",
      data: flattenUserData(vendor),
    });
  }
);
