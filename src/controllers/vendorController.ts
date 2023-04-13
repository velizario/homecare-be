import { NextFunction, Request, Response } from "express";
import vendorDBHandler from "../dao/vendorRepository";
import AppError from "../utils/appError";
import catchAsync from "../utils/errorHandler";

export const getVendorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const vendorId = Number(req.params.id);
  const vendor = await vendorDBHandler.findVendorById(vendorId);
  if (!vendor) return next(new AppError("Vendor does not exist exists", 401));
  // Proper response handling!!!
  res.status(201).json({
    status: "success",
    data: vendor,
  });
});
