import { Request, Response, NextFunction } from "express";
import vendorDBHandler from "../dao/vendorRepository";
import catchAsync from "../utils/errorHandler";
import AppError from "../utils/appError";

export const getVendor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendor = await vendorDBHandler.findVendorById(req.params.id);
    if (!vendor) return next(new AppError("Vendor does not exist exists", 401));
    // Proper response handling!!!
    res.status(201).json({
      status: "success",
      data: vendor,
    });
  }
);
