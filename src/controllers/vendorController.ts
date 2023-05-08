import { NextFunction, Request, Response } from "express";
import vendorDBHandler from "../dao/vendorRepository";
import { Portfolio, User, Vendor } from "../entity/Entities";
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

export const getVendors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const vendors = await vendorDBHandler.findAllVendors();
  if (!vendors) return next(new AppError("No vendors found", 401));
  res.status(201).json({
    status: "success",
    data: vendors,
  });
});

export const updatePortfolio = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
  // getting the logged in vendor Id and adding it to the portfolio
  const portfolio = req.body as Portfolio;
  const vendorId = (res.user as User).vendorId;
  const vendor = await vendorDBHandler.findVendorById(vendorId);
  portfolio.vendor = vendor!

  console.log(req.body)
  const updatedPortfolio = await vendorDBHandler.updatePortfolio(req.body as Portfolio);
  if (!updatedPortfolio) return next(new AppError("Error updating", 401));
  res.status(201).json({
    status: "success",
    data: updatedPortfolio,
  });
});
