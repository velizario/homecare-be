import catchAsync from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import EssentialsDBHandler from "../dao/essentialsRepository";

export const getEssentialData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const serviceTypes = await EssentialsDBHandler.findAllServiceTypes();
  const visitFrequencies = await EssentialsDBHandler.findAllVisitFrequencies();
  const visitDays = await EssentialsDBHandler.findAllVisitDays();
  const orderStatuses = await EssentialsDBHandler.findAllOrderStatuses();
  const visitHours = await EssentialsDBHandler.findAllVisitHours();
  const estateSizes = await EssentialsDBHandler.findAllEstateSizes();
  const districtNames = await EssentialsDBHandler.findAllDistrictNames();

  res.status(201).json({
    status: "success",
    data: { serviceTypes, visitFrequencies, visitDays, orderStatuses, visitHours, estateSizes, districtNames },
  });
});
