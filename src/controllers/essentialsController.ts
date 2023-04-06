import catchAsync from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import EssentialsDBHandler from "../dao/essentialsRepository";

export const getServiceTypes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const serviceTypes = await EssentialsDBHandler.findAllServiceTypes();

  res.status(201).json({
    status: "success",
    data: serviceTypes,
  });
});

export const getDistrictNames = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const districtNames = await EssentialsDBHandler.findAllDistrictNames();

  res.status(201).json({
    status: "success",
    data: districtNames,
  });
});

export const getOrderStatuses = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderStatuses = await EssentialsDBHandler.findAllOrderStatuses();

  res.status(201).json({
    status: "success",
    data: orderStatuses,
  });
});
